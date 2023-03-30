const router = require('express').Router();
const express = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//    /dashboard
//The same as the home page, but only accessible to logged in users
router.get('/', async (req, res) => {
    try {
        let findAllPosts = await Post.findAll({ where: {
            user_id: req.session.user_id
        },
        include: [{ model: Comment }, { model: User }]
        });

        //getting all the posts ready to display
        const posts = findAllPosts.map((post) => post.get({ plain: true }))
        res.render('dashboard', { 
            posts, 
            logged_in: true 
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Separate page to edit the selected post
router.get('/edit/:id', async (req, res) => {
    let getPost = req.params.id;

    try {
        let updatePost = await Post.findOne({ 
            where: { 
                id: getPost 
            },
            attributes: [ 
                'id', 
                'post_date', 
                'post_title', 
                'post_content' 
            ],
            include: [{ 
                model: User, 
                attributes: ['username']
            },
            {
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
            }]
        });
    
        const specificPost = updatePost.get({ plain: true });
        res.render('editPost', { 
            specificPost, 
            logged_in: true 
        })
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

router.get('/createPost', withAuth, async (req, res) => {
    try {
      // Find the current user
      const currentUser = await User.findByPk(req.session.user_id);
  
      // Render the addPost template with the user context
      res.render('addPost', { 
        user: currentUser.get({ plain: true }), 
        logged_in: true 
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/createComment', (req, res) => {
    res.render('addComment')
})

module.exports = router;