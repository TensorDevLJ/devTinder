const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
app.use(express.json());
const { validationSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');


app.post("/signup", async (req, res) => {
    
try{
    // Validate of data
    validationSignUpData(req);

    //Encrypting password
   const {password} = req.body;

   const passworsHash = await bcrypt.hash(password, 10);
   console.log(passworsHash);



    //creating a new instance of the user model

        const user = new User({
            firstName, lastName, email, password: passworsHash,
        });   
    

        await user.save();
        res.send("User created successfully");
    }
        catch (err) {
        console.error(err);
        res.status(500).send("ERROR"+ err.message);
    }
});

app.post("/login", async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await User.findOne({email : email});
        if(!user) {
            throw new Error("EmailId is not valid");
        }

        const isPasswordValid =await  bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            res.send("Login successful !!!");
        }
        else {
            throw new Error(" Password is not valid");
        }

    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})

app.get("/user", async (req, res) => {
     const userEmail = req.body.email;
 
    try{
     const user = await User.find({ email: userEmail});

     if(user.length === 0) {
         return res.status(404).send("User not found");
     }else {
     res.send(user);
     }
    } catch(err) {
        
        res.status(500).send("Error fetching user: " + err.message);
    }
});


app.get("/feed",  async (req, res) => {
    try {
       const user = await  User.find();
        if (!user || user.length === 0) {
            return res.status(404).send("No users found");
        }
        res.send(user);

    } catch (err) {
        res.status(500).send("Error fetching feed: " + err.message);
    }
});

//delete method
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
      
        res.send("User deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting user: " + err.message);
    }
}
);
//update method

app.patch("/user/:useId", async(req, res)=> {
    const  userId = req.params?.userId;
    const data= req.body;

   

    try {
         const allowedUpdates = [  'password', 'age', 'gender', 'photoUrl', 'bio', 'Skills'];
         const isUpdatesAllowed = Object.keys(data).every((k) =>
          allowedUpdates.includes(k)
          );
         if (!isUpdatesAllowed) {
         return res.status(400).send("Invalid updates");
        }
        const user = await User.findByIdAndUpdate({ _id:userId }, data, {
            returnDocument: 'after',
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");
    }
    catch (err) {
        res.status(500).send("Error updating user: " + err.message);
    }
})


connectDB().then(() => {
    console.log("Database connection established.......");
    app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
 });
}).catch(err => {
    console.error("Database connection failed:", err);
})

