-initialize the git 
- .gitignore (why we use that n create and what are things we have to put brief sbout this)
- create a remote repo on git(give commands)
- push all codes to remote origin 
- play with routes and routes extensions ex. /hello, / , /hello/2 , /xyz
- order of routes matter a lot

- HTTP methods (give brief about http protocol wts that use n application how we use)

 - install postman app and make a workspace/ collection > test api call (give some steps to this)

 - write logic to handle GET POST PATCH DELETE api calls and test them on postman 
 eg;-
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