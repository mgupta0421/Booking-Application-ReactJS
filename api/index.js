const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

const bcryptsalt = 'bcrypt.genSalt(10)';
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
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptsalt),
    });

    res.json(userDoc);
});


app.listen(4000);

