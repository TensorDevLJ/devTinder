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


# 🚀 User Management API – Express.js + MongoDB (Mongoose)

This project provides a basic user management REST API built using **Express.js** and **MongoDB** via **Mongoose**. It includes all essential operations such as user signup, retrieval, update, and deletion.

---

## 📁 Project Structure

```
project-folder/
├── config/
│   └── database.js      # MongoDB connection
├── models/
│   └── user.js          # User schema
├── server.js            # Express server (entry point)
└── README.md
```

---

## 📌 Difference Between JavaScript Object and JSON Object

| JavaScript Object                         | JSON Object                            |
|------------------------------------------|----------------------------------------|
| Can contain functions, undefined, symbols| Cannot contain functions or undefined  |
| Keys can be unquoted                     | Keys must be in double quotes          |
| Used in JavaScript code                  | Used for data interchange              |
| Example: `{ name: "John" }`              | Example: `{ "name": "John" }`          |

---

## 📦 Add `express.json()` Middleware

```js
const express = require("express");
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());
```

---

## 🔐 Signup API – POST `/signup`

Creates a new user with data received from the client.

```js
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(500).send("Error creating user: " + err.message);
    }
});
```

---

## 📩 Get User by Email – GET `/user/email/:email`

```js
app.get("/user/email/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});
```

---

## 📤 Get All Users (Feed) – GET `/feed`

```js
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) return res.status(404).send("No users found");
        res.json(users);
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
});
```

---

## 🔍 Get User by ID – GET `/user/:id`

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

## ❌ Delete User – DELETE `/user/:id`

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

## ✏️ Update User by ID – PUT `/user/:id`

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

## 🔁 Update User by Email – PUT `/user/email/:email`

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

## 🧠 `user.findOne()` with Duplicate Email IDs

If multiple documents have the same email, `findOne()` will return **only the first match**, based on internal order (usually insertion order unless indexed differently).

---

## ⚙️ Options in `findOneAndUpdate()`

```js
User.findOneAndUpdate(
    { email: "test@example.com" },
    { name: "Updated" },
    {
        new: true,             // return the updated document
        upsert: true,          // create the document if it doesn't exist
        runValidators: true,   // validate before update
    }
);
```

More info: [Mongoose Docs – Model.findOneAndUpdate()](https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate)

---

## 📘 Common Mongoose Model Methods

* `Model.find()`
* `Model.findOne()`
* `Model.findById()`
* `Model.create()`
* `Model.findByIdAndUpdate()`
* `Model.findByIdAndDelete()`
* `Model.findOneAndUpdate()`

Docs: [https://mongoosejs.com/docs/models.html](https://mongoosejs.com/docs/models.html)

---

## 🔌 Connect MongoDB

```js
connectDB().then(() => {
    console.log("Database connection established....");
    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});
```

---

## ✅ Conclusion

This project demonstrates a basic but powerful user management API with:

* CRUD operations
* MongoDB integration via Mongoose
* JSON middleware and error handling
* RESTful route structure

You can now build more features on top of this foundation.
