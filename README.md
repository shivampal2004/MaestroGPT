# MaestroGPT 🤖

**MaestroGPT** is a full-stack AI chat application that provides continuous, context-aware conversations powered by the **Google Gemini API** (`gemini-2.5-flash`), with chat history persisted in a MongoDB database.

---

## ✨ Features
*   **Gemini 2.5 Flash Integration**: Fast, accurate AI responses.
*   **Persistent Chat History**: Previous conversations are saved in MongoDB.
*   **Rich UI**: Markdown and code syntax highlighting (`react-markdown`).
*   **State Management**: Complex UI state handled cleanly using React Context API.
*   **Typing Effect**: Simulated streaming for a polished user experience.

## 🛠️ Tech Stack
*   **Frontend**: React (Vite), Context API, CSS
*   **Backend**: Node.js, Express, MongoDB/Mongoose, Google Gemini API

---

## 🚀 Quick Start

### 1. Prerequisites
* Node.js & MongoDB
* Google Gemini API Key

### 2. Backend Setup
```bash
git clone <repository-url>
cd MaestroGPT/Backend
npm install
```
Create a `.env` in the `Backend` folder:
```env
PORT=8080
DB_URL=mongodb://127.0.0.1:27017/maestrogpt
GEMINI_API_KEY=your_gemini_api_key_here
```
Run the server: `npm run dev`

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🏗️ Core API Endpoints
* `GET /api/thread` - Fetch all conversation headers.
* `GET /api/thread/:id` - Fetch messages for a specific thread.
* `POST /api/chat` - Send a message to Gemini and save the response.
* `DELETE /api/thread/:id` - Delete a conversation.
