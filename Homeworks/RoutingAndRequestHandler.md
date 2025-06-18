# 🚀 Full Express.js API Project Setup

This project demonstrates the full setup of an Express.js API server, Git initialization, remote repository linking, route handling, query & dynamic parameters, regex routes, and testing using Postman.

---

## 🧰 1. Initialize Git

```bash
git init
```

Initializes a local Git repository.

---

## 📄 2. Create `.gitignore`

### ✅ Why use `.gitignore`?

It prevents unnecessary files from being tracked by Git (e.g., `node_modules` or `.env`).

### Example:

```gitignore
node_modules/
.env
.DS_Store
package-lock.json
```

---

## 🌍 3. Create and Link to Remote Repository

### Steps:

1. Go to [https://github.com](https://github.com) → Create a new repository.
2. Link remote and push code:

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git add .
git commit -m "initial commit"
git push -u origin main
```

---

## 🧪 4. Install Dependencies

```bash
npm init -y
npm install express
npm install --save-dev nodemon
```

Update scripts in `package.json`:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

---

## 📦 5. Create Express Server with Routes

### 🔧 `app.js`

```js
const express = require("express");
const app = express();

app.use(express.json());

// Basic Routes
app.get("/", (req, res) => {
  res.send("Home Route");
});

app.get("/hello", (req, res) => {
  res.send("Hello Route");
});

// Dynamic Route
app.get("/hello/:id", (req, res) => {
  res.send(`Hello, your ID is ${req.params.id}`);
});

// Query Parameters
app.get("/search", (req, res) => {
  const query = req.query.q;
  res.send(`Search results for: ${query}`);
});

// Wildcard Route
app.get("/ab*cd", (req, res) => {
  res.send("Matched wildcard /ab*cd");
});

// Regex Routes
app.get(/^\/a$/, (req, res) => {
  res.send("Exact match for /a");
});

app.get(/^\/.*fly$/, (req, res) => {
  res.send("Matched route ending with 'fly'");
});

// CRUD API for /user
app.get("/user", (req, res) => {
  res.send("GET: Hello, User!");
});

app.post("/user", (req, res) => {
  console.log("POST Data:", req.body);
  res.send("POST: Data saved!");
});

app.patch("/user", (req, res) => {
  console.log("PATCH Data:", req.body);
  res.send("PATCH: Data updated!");
});

app.delete("/user", (req, res) => {
  console.log("DELETE called");
  res.send("DELETE: Data deleted!");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

---

## 🌐 6. HTTP Protocol & Methods

### What is HTTP?

**HTTP** (HyperText Transfer Protocol) is used for communication between client and server.

| Method  | Purpose               |
|---------|------------------------|
| GET     | Read data              |
| POST    | Create new data        |
| PATCH   | Update existing data   |
| DELETE  | Remove data            |

---

## 🧪 7. Testing with Postman

### ✅ Steps:

1. Install [Postman](https://www.postman.com/downloads/)
2. Create a new **Workspace** and **Collection**
3. Add new requests:
   - Method: GET, POST, PATCH, DELETE
   - URL: `http://localhost:3000/user`
4. For POST/PATCH, select `Body > raw > JSON`:
```json
{
  "name": "Likhitha"
}
```
5. Hit **Send** and view response

---

## 🧠 8. Express Routing Summary

| Pattern | Meaning |
|--------|---------|
| `/ab*cd` | Matches any path starting with `ab` and ending in `cd` |
| `/hello/:id` | Dynamic route parameter |
| `/search?q=term` | Query string |
| `/^\/.*fly$/` | Regex: Ends with "fly" |

---

## 🎯 Tips

- Place specific routes **above** generic ones.
- Use Postman for testing all methods.
- Keep `.gitignore` updated to prevent accidental file pushes.
- Use regex only when wildcard/dynamic routes don't suffice.

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [Postman Learning Center](https://learning.postman.com/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)