const router = require('express').Router();
const User = require('../../models/User.js');
const Post = require('../../models/Post.js');
const Comment = require('../../models/Comment.js');

//! The following ties in with the "login" HTML page to obtain the req.body
//Get all Users
router.get('/', async (req, res) => {
  try {
    //Make sure the password isn't returned for s
    let getAllUsers = await User.findAll({ attributes: { exclude: ['password']}});

    res.json(getAllUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




module.exports = router;
