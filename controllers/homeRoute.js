const router = require('express').Router();
const express = require('express');
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection.js');

//The '/home' route
//The home page will have all of everyones posts
router.get('/', async (req, res) => {
  try {
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

    let posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//Get Specific post with it's attached comments
router.get('/post/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const individualPostData = await Post.findOne({
      where: { 
        id: postId 
      },
      attributes: [
        'id',
        'post_date',
        'post_title',
        'post_content'
      ],
      include: [{
        model: Comment,
        attributes: [
          'id',
          'user_id',
          'post_id',
          'comment_date',
          'comment_content'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }]
    });

    const post = individualPostData.get({ plain: true });

    res.render('singlePost', {
      post,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Log in or sign up, same page
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
  } else {
  res.render('login');
  }
});

module.exports = router;