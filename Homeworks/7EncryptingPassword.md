# Encrypting Password

- validate data in signup API
- Install bcrypt package
- Create PasswordHash using  bcrypt.hash & save the user is excrupted password
- create login API
- compare passwords and throw errors if email or password is invalid
- 


# 🔐 Password Encryption with bcrypt

This document explains how to **validate user data**, **hash passwords using bcrypt**, and **authenticate users via login API** using `Node.js`, `Express`, and `MongoDB`.

---

## 📦 Prerequisites

- Node.js & npm
- MongoDB
- Express.js
- Mongoose
- bcrypt

---

## 🚀 Installation

```bash
npm install express mongoose bcrypt
```

---

## ✅ 1. Validate Data in Signup API

Use Mongoose schema validations and optional `express-validator`:

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});
```

---

## 🔐 2. Install bcrypt Package

```bash
npm install bcrypt
```

---

## 🔒 3. Create Password Hash and Save Encrypted Password

```js
const bcrypt = require("bcrypt");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
```

---

## 📝 4. Create Signup API

```js
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
```

---

## 🔓 5. Create Login API & Compare Passwords

```js
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
```

---

## 🔐 bcrypt Summary

- `bcrypt.hash(password, saltRounds)` – Hashes password
- `bcrypt.compare(plain, hash)` – Compares plain password to hashed one

---

## 🧪 Test

Use Postman or frontend form to test `/api/signup` and `/api/login`.

---

## 📁 Folder Structure

```
project/
│
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── server.js
```

---

## 📜 License

MIT License

