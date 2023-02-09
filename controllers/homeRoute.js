const router = require('express').Router();
const express = require('express');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const withAuth = require('../utils/auth');

//The '/home' route
//The home page will have all of the users posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk({
      include: { model: User }
    })

    let posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      //Send the user to the login page if they haven't logged in
      logged_in: (req.session && req.session.logged_in) ? req.session.logged_in : false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Specific post with it's comments
//WHEN I click on a existing blog post, THEN I am presented with the post title, comments, post create's username, and data created for that post and have the option to leave a comment
router.get('/post/:id', withAuth, async (req, res) => {
  const postId = req.params.id;
  try {
    const allPostsData = await Post.findByPk({
      where: { id: postId },
      include: { model: User }
    });

    const allCommentsData = await Comment.findByPk({
      where: { post_id: postId },
      include: { model: User }
    });

    const sequelizePosts = allPostsData.map((post) => post.get({ plain: true }));

    const sequelizeComments = allCommentsData.map((comment) => comment.get({ plain: true }));

    //Where all the posts will live, independent if it's the users post or not
    res.render('dashboard', {
      sequelizePosts,
      sequelizeComments,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;