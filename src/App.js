const express = require('express');



const app = express();

app.get("/user", (req, res) => {
    res.send("Hello, User!");
});

app.post("/user", (req, res) => {
    console.log("save data database");
    res.send(" data saved successfully!");
});
app.delete("/user", (req, res) => {
    console.log("delete data database");
    res.send(" data deleted successfully!");
});

app.use("/hello", (req, res) => {
    res.send("Hello, !");
});
app.use("/test", (req, res) => {
    res.send("Hello, DevTinder!");
});
app.use("/hello/2", (req, res) => {
    res.send("Hello, 22!");
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
 });
