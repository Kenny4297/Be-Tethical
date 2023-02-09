const router = require('express').Router();
const { Post } = require('../../models/Post');

//Get all posts
router.get('/', async (req, res) => {
    try {
        const getPostData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'user_id', 'post_id', 'comment_date', 'comment_content']
                }
            ]
        });

        const sequelizePostData = getPostData.map((post) => post.get({ plain: true }));

        res.json(sequelizePostData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id' , async (req, res) => {
    let postId = req.params.id;

    try {
        const getSpecificPost = await Post.findOne({ where: { id: postId }})
        if (!getSpecificPost) {
            res.status(404).send("Sorry, post was not found!")
        } else {
            res.json(getSpecificPost)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        let createPost = await Post.Create({
            postDate: null, //again, awaiting DayJS() to replace NULL
            postText: req.body.post_content,
            postTitle: req.body.post_title,
            user_id: req.session.user.user_id
        })
        res.status(201).send("Post added successfully!")
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    let postId = req.params.id;

    try {
        let postToUpdate = await Post.Update({
            postTitle: req.body.post_title,
            postContent: req.body.post_content
        }, 
        { where: { id: postId }})

        if (!postToUpdate) {
            res.status(404).json({message: "Post not found!"})
            return;
        } else {
            res.status(204).send("Post updated successfully")
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    let postId = req.params.id;

    try {
        let postToDelete = await Post.destroy({ where: { id: req.params.id }});

        if (!postToDelete) {
            res.status(404).send("Sorry, no post found!")
        } else {
            res.json(postToDelete);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
