const router = require('express').Router();
const express = require('express');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const sequelize = require('../config/connection.js');

//The '/home' route
//The home page will have all of the users posts
//^ This works just fine
// router.get('/', async (req, res) => {
//   res.render('home')
// });

router.get('/', async (req, res) => {
  try {
    log = await console.log("Test inside try block");
  
    const postData = await Post.findAll({
      attributes: [
        'id',
        'post_date',
        'post_title',
        'post_content',
      ],
      include: [{
            model: Comment,
            attributes: [
              'id', 
              'user_id', 
              'post_id', 
              'comment_date', 
              'comment_content'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    console.log(postData);

    let posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)

    res.render('home', {
      posts,
      // loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log("This didn't work...")
    res.status(500).json(err);
  }
});

//Get Specific post with it's attached comments
router.get('/post/:id', async (req, res) => {
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
    res.render('individualPosts', {
      sequelizePosts,
      sequelizeComments,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

//Log in or sign up, same page
router.get('/', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  } else {
  res.render('login');
  }
});

module.exports = router;