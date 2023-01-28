require("dotenv").config();

const mongoose = require('mongoose');

const connect=async()=>{
return mongoose.connect("mongodb+srv://N:N@cluster0.0dhygui.mongodb.net/test");
}
module.exports = connect;