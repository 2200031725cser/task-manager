# 📝 Task Manager App

A simple full-stack Task Manager application built with **React (frontend)** and **Node.js + Express (backend)**.
This project demonstrates CRUD operations, API integration, state management, and basic DevOps using Docker.

---

## 🚀 Features

### Core Features

* ➕ Create tasks
* 📋 View all tasks
* ✅ Mark tasks as completed
* ❌ Delete tasks
* 🔄 Real-time UI updates
* ⚠️ Error handling & loading states

### Bonus Features

* 🔍 Filter tasks (All / Completed / Pending)
* ✏️ Edit task title
* 💾 Persistent storage using file system (`tasks.json`)
* 🐳 Docker support for full-stack setup

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* CSS (Custom styling)

### Backend

* Node.js
* Express.js
* UUID (for unique IDs)
* File system (for persistence)

### DevOps

* Docker
* Docker Compose

---

## 📁 Project Structure

```
task-manager/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── tasks.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
└── docker-compose.yml
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository

```
git clone https://github.com/2200031725cser/task-manager/
cd task-manager
```

---

## ▶️ Run Without Docker

### Backend

```
cd backend
npm install
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🐳 Run With Docker (Recommended)

Make sure Docker Desktop is running.

From root folder:

```
docker compose up --build
```

---

### 🌐 Access Application

* Frontend: http://localhost:5173
* Backend API: http://localhost:5000/tasks

---

## 📡 API Endpoints

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /tasks     | Get all tasks     |
| POST   | /tasks     | Create a new task |
| PATCH  | /tasks/:id | Update task       |
| DELETE | /tasks/:id | Delete task       |

---

## 📊 Task Data Model

```json
{
  "id": "string",
  "title": "string",
  "completed": "boolean",
  "createdAt": "timestamp"
}
```

---

## 🧪 Testing

Basic API testing can be done using tools like:

* Postman
* Thunder Client
* curl

---

## 💡 Design Decisions

* Used **file-based storage** to keep setup simple without a database
* Separated frontend and backend for scalability
* Used **React hooks** for state management
* Implemented **RESTful API design**
* Added **Docker support** for consistent environment setup

---

## ⚠️ Known Limitations

* No authentication (single-user app)
* No database (uses JSON file)
* Minimal UI (focused on functionality)

---

## 🚀 Future Improvements

* Add database (MongoDB / PostgreSQL)
* User authentication
* Better UI (Tailwind / Material UI)
* Deploy to cloud (Vercel + Render)

---

## 👨‍💻 Author

Developed as part of a full-stack assignment to demonstrate:

* Frontend development
* Backend API design
* Integration & state handling
* Basic DevOps practices

---

## ⭐ Summary

This project showcases a complete full-stack workflow:

* API development
* UI interaction
* Data persistence
* Containerization

---
