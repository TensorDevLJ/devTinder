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
