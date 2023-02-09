const router = require('express').Router();
const usersRoutes = require('./user-routes');
const commentsRoutes = require('./comments-Routes');
const postsRoutes = require('./posts-routes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.user('/comments', commentsRoutes);

module.exports = router;
