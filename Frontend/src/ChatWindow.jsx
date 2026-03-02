import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";

export default function ChatWindow(){
    const {prompt, setPrompt, reply, setReply, currThreadId}= useContext(MyContext);
    const getReply= async()=>{
        const options= {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId,
            })
        };

        try{
            const response= await fetch("http://localhost:8080/api/chat", options);
            const res= await response.json();
            console.log(res);
        } catch(err){
            console.log(err);
        }
    }
    return(
        <div className="chatWindow">
            <div className="navbar">
                <span className="maestroGPT">MaestroGPT <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            <Chat></Chat>
            <div className="chatInput">
                <div className="inputBox">
                    <input type="text" placeholder="Ask Anything" value={prompt} onChange={(e)=> setPrompt(e.target.value)}/>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">MaestroGPT can make mistakes. Check important info. See Cookie Preferences.</p>
            </div>
        </div>
    );
};