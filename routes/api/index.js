const router = require('express').Router();

const userRoutes = require('./user-routes');
const questionRoutes = require('./question-routes');
const jobsRoutes = require('./jobs-routes');
const scrapeRoutes = require('./scrape-routes');

router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/jobs', jobsRoutes);
router.use('/scrape', scrapeRoutes);


module.exports = router;
