const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
       
    },
   email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Regex for basic email validation
    lowercase: true, // Store email in lowercase
    trim: true, // Remove leading and trailing whitespace
    validate: {
        validate(value) {
             if(!validator.isEmail(value)) {
                throw new Error("Email is not valid");
             }
            }
        }
        },
    password: {
        type: String,
        required: true,
         validate(value) {
             if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password");
             }
            }
    },
    age: {
        type: Number,
        min:18,
        
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others" ].includes(value) ) {
                throw new Error("Gender data not valid");
        }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png', // Default profile picture URL
     validate(value) {
             if(!validator.isUrl(value)) {
                throw new Error("Photourl is not valid" + value);
             }
            }
    
    },
    bio: {
        type: String,
        maxlength: 500,
        default: 'This is default bio for user', // Default to an empty string
    },
    Skills: {
        type: [String], // Array of strings for skills
        default: [], // Default to an empty array
    },
},

{
    timestamps: true, 
    versionKey: false, 
},


);

module.exports = mongoose.model('User', userSchema);
