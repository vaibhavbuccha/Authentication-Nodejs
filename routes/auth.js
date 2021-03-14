const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

// REGISTER ROUTE
router.post('/register',async (req, res)=>{

    // LET VALIDATE THE DATA BEFORE WE CREATE A USER
    const { error } = registerValidation(req.body);
    if( error ) return res.status(400).json({message: error.details[0].message});

    // check for unique email
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).json({message: "Email Already Used."});

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.status(200).json({
            message: "User Registered",
            data: savedUser
        });
    }
    catch(err){
        res.status(400).json({
            err
        });
    }
});

// LOGIN ROUTE

router.post('/login', async (req, res)=>{
    // validation
    const { error } = loginValidation(req.body);
    if( error ) return res.status(400).json({message: error.details[0].message});

    // check for unique email
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: "Email is not registered."});

    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(419).json({message: "Password is invalid"});

    // create and assign a token
    const token = jwt.sign({_id: user._id, email: user.email, name: user.name}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).json({token});
    // res.status(200).json({message: "logged in"});
});

module.exports = router;