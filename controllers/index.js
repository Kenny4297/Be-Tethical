const router = require('express').Router();

const apiRoutes= require('./api');
const homeRoute = require('./homeRoute.js');
const dashboardRoute = require('./dashboardRoute.js')

router.use('/', homeRoute);
router.use('/api', apiRoutes);
router.use('dashboard', dashboardRoute);

module.exports = router;
