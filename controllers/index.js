const router = require('express').Router();
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;