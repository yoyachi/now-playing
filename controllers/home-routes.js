const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// homepage
router.get('/', (req,res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.json(posts);
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});
// users page
router.get('/:id', (req,res) => {
    Post.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.json(posts);
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
})
// login page
router.get('/login', (req,res) => {
    res.json({message: 'this will be the login page '});
});



module.exports = router;