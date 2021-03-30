const router = require('express').Router();
const sequelize = require('../../config/connection');

// get all users
router.get('/', (req,res) => {
    res.json({ user: 'yes' });
});
// get one user
router.get('/:id', (req,res) => {
    res.json({ user: req.params.id });
});
// create user
router.post('/', (req,res) => {
    res.json({ user: 'created' });
});
// update user
router.put('/:id', (req,res) => {
    res.json({ user: 'updated' });
});
// delete user
router.delete('/:id', (req,res) => {
    res.json({ user: 'destroy' });
})

module.exports = router;