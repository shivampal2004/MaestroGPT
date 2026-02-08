import "dotenv/config";

const getGeminiApiResponse = async (message) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is missing");
        return "Error: API Key is missing.";
    }

    // USE THIS MODEL: gemini-2.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: message
                }]
            }]
        })
    };

    try {
        const response = await fetch(url, options);

        // Handle Rate Limits (429) gracefully
        if (response.status === 429) {
            return "I'm receiving too many requests. Please wait a moment and try again.";
        }

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Gemini API Error: ${response.status} - ${errorBody}`);
            return `Error: API Issue (${response.status}).`;
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return responseText || "No response text found.";

    } catch (err) {
        console.error("Error fetching from Gemini:", err.message);
        return "Server Error: Unable to reach AI.";
    }
}

export default getGeminiApiResponse;