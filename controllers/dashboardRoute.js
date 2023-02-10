const router = require('express').Router();
const express = require('express');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const withAuth = require('../utils/auth');

//The same as the home page, but only accessible to logged in users
router.get('/', withAuth, async (req, res) => {
    try {
        let findAllPosts = await Post.findAll({ where: {
            user_id: req.session.user_id
        },
        include: [{ model: Comment }, { model: User }]
        });

        const allPosts = findAllPosts.map((post) => post.get({ plain: true }))
        res.render('dashboard', { 
            allPosts, 
            loggedIn: true })
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

//Separate page to edit the selected post
router.get('/edit/:id', withAuth, async (req, res) => {
    let getPost = req.params.id;

    try {
        let updatePost = await Post.findOne({ 
            where: { 
                id: getPost 
            },
            attributes: [ 
                'id', 
                'post_data', 
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
    
        if (!updatePost) {
            res.status(404).send("Sorry, no posts found!");
            return
        } else {
            const specificPost = updatePost.get({ plain: true });
            res.render('editPost', { specificPost, loggedIn: true })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

module.exports = router;