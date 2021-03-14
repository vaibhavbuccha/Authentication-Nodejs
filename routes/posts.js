const express = require('express');
const router = express.Router();
const verify = require('../routes/verifyToken');

router.get('/', verify,(req, res) => {
    res.json({
        posts: {
            id: req.user._id ,
            name: req.user.name ,
            title: "my first post", 
            description: "random data you should access here!"
        }
    })
})

module.exports = router;