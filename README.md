# 💘 devTinder

devTinder is a developer matchmaking app — think of it like Tinder but for developers! It connects like-minded tech enthusiasts to collaborate, build projects, or just vibe with the tech community.

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (as the database)

### 📦 Tools & Packages
- npm
- REST APIs
- Other useful packages (like bcrypt, JWT, etc.)

---

## 🚀 Features

- 🔐 **User Authentication**
  - Create an account
  - Login
- 👤 **Profile Management**
  - Update your profile (name, age, gender, etc.)
- 🧭 **Feed Page (Explore)**
  - Browse and explore other developer profiles
- 🤝 **Connections**
  - Send connection requests or ignore them
  - View requests you’ve sent or received
  - See your accepted matches
- 🔄 **Profile Update**
  - Edit your details any time

---

## 🧩 Architecture Planning

### 🧱 Microservices Structure

- **Frontend**
  - Built using React.js

- **Backend**
  - Built using Node.js and Express.js
  - Database: MongoDB

---

## 🧬 Low-Level Design (LLD)

### 📦 Database Design

#### 👤 User Collection
| Field      | Type     |
|------------|----------|
| `firstName`| String   |
| `lastName` | String   |
| `password` | String   |
| `age`      | Number   |
| `gender`   | String   |

#### 🔗 Connection Requests
| Field      | Type     | Description                         |
|------------|----------|-------------------------------------|
| `fromUserId` | ObjectId | User who sends the request          |
| `toUserId`   | ObjectId | User who receives the request       |
| `status`     | String   | `pending`, `accepted`, `rejected`, `ignored`, `blocked` |

---

## 🌐 API Design (REST)

> **REST (Representational State Transfer)** APIs enable communication between frontend and backend over HTTP.

### 🧾 HTTP Methods Used

| Method   | Description                             |
|----------|-----------------------------------------|
| `GET`    | Read data from the server               |
| `POST`   | Create/send new data to the server      |
| `PUT`    | Replace existing data on the server     |
| `PATCH`  | Modify part of the existing data        |
| `DELETE` | Remove or delete data from the server   |

---

## 📘 Example: Login Flow

- User enters email and password in frontend
- Frontend sends `POST` request to backend: `/api/login`
- Backend checks credentials in MongoDB
- Response (success or failure) is sent back to frontend

---

## 📌 Coming Soon

- Dark/light theme toggle
- Block/report users
- Chat functionality
- Admin dashboard

---

> Built with ❤️ by passionate developers, for developers. Let’s match, code, and collaborate!
