### Diving into the API's

- difference between javascript  object  and json object
- add the express.json middleware to your app
- make your signup API dynamic to recieve data from the end user(web or postman)
- user.findOne() with duplicate emailIds , which object is returned
- API - get user by email
- API feed API- GET/feed - get all the users from the database
- API - get userbyId function and write the syntax
- create a delete user APIs
- API - update the user
- explore the mongoose documentation for model methods
- what are options in avModel.findOneAndUpdate() methode , explore more about it
-  API - update the user with enmailID 


# User Management API - Express + MongoDB (Mongoose)

This README provides explanations and code examples for commonly used concepts and tasks in a typical Express.js and MongoDB-based REST API application.

---

## 📌 Differences between JavaScript Object and JSON Object

| JavaScript Object                         | JSON Object                            |
|------------------------------------------|----------------------------------------|
| Can contain functions, symbols, undefined| Cannot contain functions or undefined  |
| Keys can be unquoted                     | Keys must be in double quotes          |
| Used in JavaScript code                  | Used for data interchange              |
| Example: `{ name: "John" }`              | Example: `{ "name": "John" }`          |

---

## 📦 Add `express.json()` Middleware

```js
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
```

---

## 📝 Dynamic Signup API

```js
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

---

## 🔁 `user.findOne()` with Duplicate Email IDs

If `User.findOne({ email: 'test@example.com' })` is called and multiple documents have the same email, **only the first match** is returned based on insertion order.

---

## 📩 API - Get User by Email

```js
app.get("/user/email/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});
```

---

## 📤 API - GET /feed (All Users)

```js
app.get("/feed", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
```

---

## 🔍 API - Get User by ID

```js
app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (err) {
        res.status(400).send("Invalid ID");
    }
});
```

---

## ❌ Delete User API

```js
app.delete("/user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Invalid ID");
    }
});
```

---

## ✏️ Update User API

```js
app.put("/user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
```

---

## 📘 Mongoose Model Methods

Refer to [Mongoose Docs: Models](https://mongoosejs.com/docs/models.html)

Common model methods:
- `Model.find()`
- `Model.findOne()`
- `Model.findById()`
- `Model.create()`
- `Model.findByIdAndUpdate()`
- `Model.findByIdAndDelete()`

---

## ⚙️ Options in `findOneAndUpdate()`

Example:

```js
User.findOneAndUpdate({ email: "test@example.com" }, { name: "Updated" }, {
    new: true,             // returns updated document
    upsert: true,          // creates if not exists
    runValidators: true,   // runs schema validation
});
```

Refer to: [Mongoose findOneAndUpdate Options](https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate())

---

## 🔄 API - Update User by Email

```js
app.put("/user/email/:email", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
```

---

## ✅ Done!

This README covers essential CRUD API operations and concepts used with Express and MongoDB via Mongoose.



# 🚀 User Management API with Express.js & MongoDB (Mongoose)

This project provides a basic user management API built using **Express.js** and **MongoDB** via **Mongoose**. It includes common operations such as user signup, retrieval, deletion, and updating.

---

## 📂 Project Structure

```
project-folder/
├── config/
│   └── database.js      # MongoDB connection
├── models/
│   └── user.js          # User schema
├── server.js            # Express server (this file)
└── README.md
```

---

## 📦 Middleware Setup

```js
app.use(express.json());
```

This middleware allows the server to parse incoming JSON requests.

---

## 🔐 Signup API - POST `/signup`

Creates a new user with the data from the request body.

```js
app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(500).send("Error creating user" + err.message);
    }
});
```

---

## 📩 Get User by Email - GET `/user`

Fetches a user based on email provided in the body.

```js
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.find({ email: userEmail });
        if (user.length === 0) return res.status(404).send("User not found");
        res.send(user);
    } catch (err) {
        res.status(500).send("Error fetching user: " + err.message);
    }
});
```

---

## 📋 Get All Users (Feed) - GET `/feed`

Fetches all users from the database.

```js
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find();
        if (!user || user.length === 0) return res.status(404).send("No users found");
        res.send(user);
    } catch (err) {
        res.status(500).send("Error fetching feed: " + err.message);
    }
});
```

---

## ❌ Delete User - DELETE `/user`

Deletes a user by their `userId` in the request body.

```js
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting user: " + err.message);
    }
});
```

---

## ✏️ Update User - PATCH `/user`

Updates a user based on the `userId` and new data sent in the request body.

```js
app.patch("/user", async(req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({ _id: userId }, data);
        res.send("User updated successfully");
    } catch (err) {
        res.status(500).send("Error updating user: " + err.message);
    }
});
```

---

## 🔌 MongoDB Connection

```js
connectDB().then(() => {
    console.log("Database connection established.......");
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});
```

---

## 🧠 Learn More

- [Mongoose Models Documentation](https://mongoosejs.com/docs/models.html)
- [Mongoose findOneAndUpdate() Options](https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate())
