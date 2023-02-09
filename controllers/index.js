const router = require('express').Router();

const apiRoutes= require('./api');
const homeRoute = require('./homeRoute.js')
const loginRoute = require('./loginRoute.js')

router.use('/login', loginRoute)
router.use('/', homeRoute)
router.use('/api', apiRoutes);

module.exports = router;
