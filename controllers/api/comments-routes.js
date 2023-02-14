const router = require('express').Router();
const { Comment } = require('../../models');

//Get all comments
router.get('/', async (req, res) => {
    try {
        let getAllComments = await Comment.findAll({
            where: { post_id: post.id },
            include: [
            {
            model: User,
            attributes: ['username'],
            },
        ],
        })
        res.json(getAllComments)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Create a comment
router.post('/', async (req, res) => {  
    if (req.session) {
        try {
            let createdComment = await Comment.create({
                user_id: req.session.user_id, 
                post_id: req.body.post_id,
                comment_date: new Date().toISOString(), 
                comment_content: req.body.comment_text
            });
            const user = await User.findByPk(req.session.user_id);
            createdComment.dataValues.user_name = user.user_name;
            res.json(createdComment)
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    }  
});

//Update a comment
router.put('/:id', async (req, res) => {
    let commentId = req.params.id;

    try {
        let commentToUpdate = await Comment.Update({ 
            where: { id: commentId }},
            { comment_content: req.body.comment_text});

        if (!commentToUpdate) {
                res.status(404).json({message: "Post not found!"})
                return;
                } else {
                    res.json(commentToUpdate);
                }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })


//Delete a specific comment
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        let destroyComment = await Comment.destroy({
            where: { id: postId }
        });
        if (!destroyComment) {
            res.status(404).json({ message: "Comment not found!"})
            return;
        } else {
            res.json(destroyComment);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;