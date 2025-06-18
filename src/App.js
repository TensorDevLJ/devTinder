const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
app.use(express.json());



app.post("/signup", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: "likhithaj22@gmail.com" });

        if (existingUser) {
            return res.status(400).send("User with this email already exists.");
        }

        const user = new User({
            firstName: "tarun",
            lastName: "bommali",
            email: "tarun57@gmail.com",
            password: "tarun123",
            age: 22,
            gender: "male",
        });

        await user.save();
        res.send("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

connectDB().then(() => {
    console.log("Database connection established.......");
    app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
 });
}).catch(err => {
    console.error("Database connection failed:", err);
})

