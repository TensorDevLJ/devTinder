const mongoose = require('mongoose');



const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://likhithaj22:xvad0Qgn56RwaXNK@cluster0.j1xrxeb.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0",

 );
};

module.exports = connectDB;