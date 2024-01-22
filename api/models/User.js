const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserScehma = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
});


const UserModel = mongoose.model('User', UserScehma);


module.exports = UserModel;