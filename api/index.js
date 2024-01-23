const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

const bcryptsalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdgergtshshghxhgxthx';

app.use(express.json());

app.use(cors({
    credentials : true,
    origin: 'http://127.0.0.1:5173',
}));

console.log(process.env.MONGO_URL)
mongoose.connect('mongodb+srv://booking:booking123@cluster0.ieapskx.mongodb.net/');

app.get('/test', (req, res) => {
    // Sending a JSON response
    res.json('test ok');
});

app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptsalt),
        });
    
        res.json(userDoc);
    }catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {email, password} = req.body;
        const userDoc = await User.findOne({email});
        if(userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if(passOk){
                jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err,token) => {
                    if(err) throw err;
                    res.cookie('token', token).json('password ok');
                } );
            }else{
                res.json('password not ok');
            }
        } else {
            res.json('Not Found');
        }
});


app.listen(4000);

