const router = require('express').Router();
const sequelize = require('../../config/connection');

// get all posts
router.get('/', (req,res) => {
    res.json({ user: 'yes' });
});
// get one post
router.get('/:id', (req,res) => {
    res.json({ user: req.params.id });
});
// create post
router.post('/', (req,res) => {
    res.json({ user: 'created' });
});
// update post
router.put('/:id', (req,res) => {
    res.json({ user: 'updated' });
});
// delete post
router.delete('/:id', (req,res) => {
    res.json({ user: 'destroy' });
});

module.exports = router;