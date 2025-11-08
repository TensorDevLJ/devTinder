- handling multiple route hanlers and play with the code
- next()
- next function and errors along with res.send()
- practice like app.use("/route", rH, [rH2, rH3], rH4, rH5)
- what is middleware and brief about it (application syntax and much more )
- how express.js basically handles requests behind the scenes 
- difference between app.use and app.all -
- write dummy auth middleware  for admin
- write dummy auth middleware for user routes , except /user/l


# Express.js – Route Handling, Middleware, and Authorization

## 🎯 Handling Multiple Route Handlers

You can define multiple handlers for a route using the `next()` function.

```js
const express = require('express');
const app = express();

const rH1 = (req, res, next) => {
  console.log("Handler 1");
  next(); // Pass control to next middleware
};

const rH2 = (req, res, next) => {
  console.log("Handler 2");
  next(); // Continue to next
};

const rH3 = (req, res) => {
  res.send("Final Handler - Response Sent");
};

app.use("/route", rH1, [rH2], rH3);

app.listen(7777, () => {
  console.log("Server running on port 7777");
});
```

---

## ⚙️ `next()` Function and Error Handling

`next()` passes control to the next middleware in the stack. If you call `next(err)`, it skips all other middlewares and goes to the error-handling middleware.

```js
const handlerWithError = (req, res, next) => {
  const error = new Error("Something went wrong!");
  next(error);
};

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error: " + err.message);
});
```

---

## 🔄 Example: `app.use("/route", rH1, [rH2, rH3], rH4, rH5)`

This will execute:
- `rH1`
- Then both `rH2` and `rH3` in sequence (array)
- Then `rH4`
- Then `rH5`

This is useful for chaining validation, logging, authentication, etc.

---

## 📘 What is Middleware?

Middleware functions are functions that have access to the `req`, `res`, and `next` objects in the request-response cycle. They are used for tasks such as:
- Authentication
- Logging
- Parsing
- Error handling

### 🧾 Application Syntax:

```js
app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});
```

---

## ⚙️ How Express.js Handles Requests Behind the Scenes

1. Receives HTTP request.
2. Matches path and method (GET, POST, etc.).
3. Executes any middleware or route handler in order using `next()`.
4. Once response is sent using `res.send()` / `res.json()` / `res.end()`, Express terminates further processing.

---

## 🔍 `app.use` vs `app.all`

| Feature         | `app.use()`                               | `app.all()`                                 |
|----------------|-------------------------------------------|---------------------------------------------|
| Path matching  | Matches *all* HTTP methods                 | Matches *all* HTTP methods, but for a path  |
| Usage          | For middleware, logging, auth, etc.        | For handling all methods for specific path  |
| Example        | `app.use("/api", middleware)`              | `app.all("/api", handler)`                  |

---

## 🔐 Dummy Auth Middleware

### ✅ Admin Auth Middleware

```js
const adminAuth = (req, res, next) => {
  const isAdmin = true; // Replace with actual logic
  if (isAdmin) {
    next();
  } else {
    res.status(403).send("Admin access denied");
  }
};
```

### ✅ User Auth Middleware (except login/signup)

```js
const userAuth = (req, res, next) => {
  if (req.path === "/user/login" || req.path === "/user/signup") {
    return next();
  }
  
  const isAuthenticated = true; // Dummy check
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

app.use("/user", userAuth);
```

---

## 📌 Route Examples

```js
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User data sent");
});

app.get("/admin/getALLDATA", (req, res) => {
  res.send("All data sent successfully");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Delete user successfully");
});
```

---

> ✅ This structure helps in managing routes and authorization efficiently using Express.js.
