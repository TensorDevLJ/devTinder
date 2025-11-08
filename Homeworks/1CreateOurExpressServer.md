# 🚀 Express.js Setup Guide

```bash
# Step 1: Create and initialize a new repository
mkdir my-express-app
cd my-express-app
git init
npm init -y
```

```bash
# Step 2: Install Express.js
npm install express
```

```bash
# Step 3: Create the source folder and server file
mkdir src
touch src/app.js
```

```js
// src/app.js

const express = require('express');
const app = express();
const PORT = 7777;

app.get('/test', (req, res) => {
  res.send('This is a test route!');
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

```bash
# Step 4: Run the server using Node
node src/app.js
```

```bash
# Step 5: Install Nodemon globally (for auto-reload on file changes)
npm install -g nodemon
```

```bash
# Step 6: Run the server using Nodemon
nodemon src/app.js
```

```json
// Step 7: Update package.json scripts section
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```

```bash
# Step 8: Run using npm
npm run start   # Runs with Node
npm run dev     # Runs with Nodemon (auto-reload)
```

---

## 📂 Explanation of Files
- `node_modules/`: Contains installed dependencies
- `package.json`: Metadata + scripts + dependency versions
- `package-lock.json`: Lock file for consistent installs

---

## ❓ What are Dependencies?
Dependencies are packages your project needs to function. Installed via `npm install`, saved in `node_modules` and `package.json`.

---

## ❓ What is `-g` in `npm install -g`?
It installs the package **globally**, making it available in your terminal from anywhere (like a CLI tool).

---

## 🎯 Difference Between `^` and `~`
- `^1.2.3`: Allows minor & patch updates (e.g., `1.x.x`)
- `~1.2.3`: Allows only patch updates (e.g., `1.2.x`)
