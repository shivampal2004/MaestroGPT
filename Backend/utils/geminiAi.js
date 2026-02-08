import "dotenv/config";

const getGeminiApiResponse = async (message) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        return responseText;
    } catch (err) {
        console.error("Error fetching from Gemini:", err);
        return null;
    }
}

export default getGeminiApiResponse;