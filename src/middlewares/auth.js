import jwt = require('jsonwebtoken');
import User from '../models/user.js';

 export const userAuth =  async (req, res, next) => {
    // read the token from cookies
 const {token} = req.cookies;

 const decodedObj = await jwt.verify(token, "DEV@Tinder$123");
    // validate the token
const { _id } = decodedObj;

const user = await User.findById(_id);
    // find the user from the token

 };

 module.exports = {
    
    userAuth,
 }