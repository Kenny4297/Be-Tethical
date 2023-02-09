const router = require('express').Router();
const usersRoutes = require('../api/user-routes');
const commentsRoutes = require('./commentsRoutes');
const postsRoutes = require('./posts-routes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.user('/comments', commentsRoutes);

module.exports = router;
