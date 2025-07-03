# data  sanitization and schema validation 

- explore schematype options from the documentation
- add required , unique , lowercase, min, minlength, trim, 
- add default
- create  a custom validate function for gender
- improve the db schema - put all appropriatev validation on each field in the schema
- add schema to the timestamps to all users 
- add API level validation on patch request & signup post api
- DATA sanitisation - add api validation on each field
- install validator(npm i validator)
- Use validator functions(for photourl , password, email) and explore all validator functions


# User Schema Validation and Data Sanitization Guide

This document provides a detailed implementation for validating and sanitizing user data in a Node.js + MongoDB (Mongoose) API.

---

## 1. SchemaType Options (Mongoose)
Some important [Mongoose SchemaType options](https://mongoosejs.com/docs/schematypes.html):
- `required`: Makes the field mandatory.
- `unique`: Ensures no duplicate values.
- `lowercase`: Converts the value to lowercase.
- `min` / `max`: Sets min or max for numbers.
- `minlength` / `maxlength`: Sets min or max length for strings.
- `trim`: Removes whitespaces.
- `default`: Sets a default value.
- `validate`: Custom validator function.

---

## 2. Installing Validator
```bash
npm i validator
```

---

## 3. User Schema with All Validations and Sanitization
```js
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
        message: "Password is not strong enough",
      },
    },
    photoUrl: {
      type: String,
      trim: true,
      default: "https://default.com/avatar.png",
      validate: {
        validator: validator.isURL,
        message: "Please enter a valid URL",
      },
    },
    gender: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return ["male", "female", "other"].includes(value.toLowerCase());
        },
        message: "Gender must be either male, female, or other",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
```

---

## 4. API-Level Validation (Signup & Patch Request)

### Signup API (POST)
```js
app.post("/api/signup", async (req, res) => {
  const { name, email, password, gender, photoUrl } = req.body;
  if (!name || !email || !password || !gender) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }
  if (photoUrl && !validator.isURL(photoUrl)) {
    return res.status(400).json({ error: "Invalid photo URL" });
  }
  try {
    const user = await User.create({ name, email, password, gender, photoUrl });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### PATCH Request (Update User)
```js
app.patch("/api/users/:id", async (req, res) => {
  const updates = req.body;

  if (updates.email && !validator.isEmail(updates.email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (updates.password && !validator.isStrongPassword(updates.password)) {
    return res.status(400).json({ error: "Weak password" });
  }
  if (updates.photoUrl && !validator.isURL(updates.photoUrl)) {
    return res.status(400).json({ error: "Invalid photo URL" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
```

---

## 5. Explore `validator` Functions
Some useful validator functions:
- `validator.isEmail(str)`
- `validator.isStrongPassword(str, options?)`
- `validator.isURL(str)`
- `validator.isAlpha(str)`
- `validator.isAlphanumeric(str)`
- `validator.isEmpty(str)`
- `validator.isLength(str, { min, max })`

Refer to full list here: https://www.npmjs.com/package/validator

---

## ✅ Summary Checklist
- [x] Mongoose schema has all key validations and sanitization
- [x] Added timestamps to schema
- [x] Installed and used `validator` library
- [x] Added custom validator for gender
- [x] API-level field validation added for `POST /signup` and `PATCH /user`

---

## 📝 License
This project uses [MIT License](https://opensource.org/licenses/MIT)