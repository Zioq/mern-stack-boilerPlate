const mongoose = require("mongoose");

// Create user's schema
const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlenght: 50 
    },
    email: {
        type:String,
        trim: true,
        unique:true,
    },
    password: {
        type:String,
        minlenght:5
    },
    lastname: {
        type:String,
        maxlenght:50
    },
    role: {
        type:Number,
        default: 0 
    },
    image: String,

    //Manage validation using a token
    token: {
        type:String
    },
    tokenExp: {
        type:Number
    }
})

// Wrap the userSchema with a Model
const User = mongoose.model('User', userSchema);

// Export this Model
module.exports= {User};




