const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// login page
router.get('/login', (req,res) => {
    res.render("login");
});

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
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
          });
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





module.exports = router;