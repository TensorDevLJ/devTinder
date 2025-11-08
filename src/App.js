const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
app.use(express.json());
const { validationSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(cookieParser());


app.post("/signup", async (req, res) => {
  try {
    // 🔍 Validate incoming request data
    validationSignUpData(req);

    // ✅ Destructure required fields from request body
    const { firstName, lastName, email, password } = req.body;

    // 🔐 Hash the password using bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Hashed password:", passwordHash);

    // 🧱 Create a new user instance with encrypted password
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    // 💾 Save the user to the database
    await user.save();

    // ✅ Respond to the client
    res.status(201).send("User created successfully");

  } catch (err) {
    console.error(err);
    res.status(400).send("ERROR: " + err.message);
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

            //create the jwt token
        const token = await jwt.sign({ _id: user._id}, "DEV@Tinder$123");
        console.log(token);




            //add the token to the cookies and send it to the client or user
        res.cookie("token", token);

            res.send("Login successful !!!");
        }
        else {
            throw new Error(" Password is not valid");
        }

    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})

app.get("/profile", async (req, res) => {
    try {const cookies = req.cookies;

    const { token } = cookies;

    const decodedMessage = await jwt.verify(token, "DEV@Tinder$123");

    console.log(decodedMessage);
    const { _id } = decodedMessage;
    console.log("loggedIn user id:", _id);
    const user = await User.findById(_id);

    console.log(user);
  
    } catch (err) {
        console.error("Error reading cookies:", err);
        res.status(500).send("Error reading cookies: " + err.message);
    }

});

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

