const express = require('express');



const app = express();

app.get("/ab*cd", (req, res) => {
    res.send({firstName: "John", lastName: "Doe"});
});



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
 });
