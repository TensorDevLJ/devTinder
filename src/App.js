const express = require('express');



const app = express();

app.use("/test", (req, res) => {
    res.send("Hello, DevTinder!");
});
app.use("/helo", (req, res) => {
    res.send("Hello, !");
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
 });
