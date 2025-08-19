const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:po8swOE57abiOCt9@cluster0.799bz.mongodb.net/Userlist");

const userSchema = mongoose.Schema({
    firstName: String,
    username : String,
    password: String
})

const User = mongoose.model("User" , userSchema);

module.exports = {
    User
}