import express from "express";
import Thread from "../models/Thread.js";
import getGeminiApiResponse from "../utils/geminiAi.js";
const router= express.Router();

//get all threads
router.get("/thread", async(req, res)=>{
    try{
        const threads= await Thread.find({}).sort({updatedAt:-1});
        res.json(threads);
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
});

router.get("/thread/:threadId", async(req, res)=>{
    const {threadId}= req.params;
    try{
        const thread= await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error: "Thread not found"});
        }
        res.json(thread.messages);
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
});

router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        // 1. Handle User Message Logic
        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{
                    role: "user",
                    content: message
                }]
            })
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        // 2. Call Gemini API
        const assistantReply = await getGeminiApiResponse(message);

        // ---------------------------------------------------------
        // CRITICAL FIX: Check if response is null before proceeding
        // ---------------------------------------------------------
        if (!assistantReply) {
            console.error("Gemini API failed to return a response.");
            return res.status(500).json({ error: "Failed to generate AI response" });
        }

        // 3. Only push and save if we actually have a reply
        thread.messages.push({ role: "assistant", content: assistantReply });

        thread.updatedAt = new Date();
        await thread.save();
        
        res.json({ reply: assistantReply });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.delete("/thread/:threadId", async(req, res)=>{
    const {threadId}= req.params;
    try{
        const deletedThread= await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error:"Thread not found"})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
});

export default router;