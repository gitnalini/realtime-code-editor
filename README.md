# CodeBook 🖥️

> A real-time collaborative code editor — write code together, instantly.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-2ea44f?style=flat-square)](https://code-sync--nalinipatidar.replit.app/)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)

---

## About

CodeBook is a real-time collaborative code editor built with React, Node.js, and Socket.IO. Multiple users can join a shared room and edit code simultaneously — perfect for pair programming, technical interviews, or remote collaboration.

---

## Features ✨

- 🔄 **Real-time sync** — code changes reflect instantly across all connected users
- 🚪 **Room-based sessions** — create or join rooms using a unique Room ID
- 👥 **Multi-user support** — see who joins and leaves the session live
- 📋 **Copy Room ID** — share your room with one click
- 🎨 **Rich editor** — syntax highlighting, themes, and key bindings via CodeMirror
- 🔔 **Join/leave notifications** — stay informed of collaborators in real time

---

## Tech Stack 🛠️

| Layer | Technology |
|-------|-----------|
| Frontend | React, CodeMirror, React Router, React Hot Toast |
| Backend | Node.js, Express, Socket.IO |
| Deployment | Replit |

---

## Getting Started 🚀

### Prerequisites

- Node.js >= 14
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/gitnalini/realtime-code-editor.git
cd realtime-code-editor

# Install dependencies
npm install

# Start the server
node server.js

# In a separate terminal, start the React app
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## How to Use 📖

1. Visit the [Live Demo](https://code-sync--nalinipatidar.replit.app/)
2. Enter your username and create or join a room
3. Share the **Room ID** with your collaborators
4. Start coding — edits sync in real time across all users!

---

## Project Structure 📁

```
realtime-code-editor/
├── public/
├── src/
│   ├── components/
│   └── ...
├── server.js
├── package.json
└── .env
```

---

## Live Demo 🌐

👉 [https://code-sync--nalinipatidar.replit.app/](https://code-sync--nalinipatidar.replit.app/)

---

## Author

**Nalini Patidar**  
[GitHub](https://github.com/gitnalini) · [LinkedIn](https://linkedin.com/in/nalini-patidar) · [Email](mailto:nalinipatidar626@gmail.com)

---

## License

This project is open source and available under the [MIT License](LICENSE).



 
