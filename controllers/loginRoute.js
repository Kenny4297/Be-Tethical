const router = require('express').Router();
const express = require('express');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

//Redirect the user to the homepage
router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
    res.render('login');
    }
});

module.exports = router;
