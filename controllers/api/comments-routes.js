const router = require('express').Router();
const { Comment } = require('../../models/Comment');

//No need to get all the comments, just have the option to create and delete comments

router.get('/', async (req, res) => {
    try {
        let getAllComments = await Comment.findAll({})
        res.json(getAllComments)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {    
    //Try to create the comment
    try {
        let createdComment = await Comment.create({
            commentDate: req.body.comment_date,
            commentText: req.body.comment_content,
            //Session are required to make sure the user is still logged in to make this comment??
            user_id: req.session.user_id,
            post_id: parseInt(postId)
        });
        res.json(createdComment)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    let commentId = req.params.id;

    try {
        let commentToUpdate = await Comment.Update({ 
            where: { id: commentId }},
            { commentContent: req.body.comment_text}
            );

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