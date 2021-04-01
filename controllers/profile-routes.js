const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// homepage
router.get('/user', (req,res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username', 'email']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('profile', {
            posts,
            loggedIn: true,
            username: req.session.username
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});
// page to create a post
router.get('/post', (req,res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.json({ message: 'this page will be to create a post' });
});
// edit users information
router.get('/edit-post/:id', (req,res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    Post.findOne({
        where: {
            user_id: req.session.user_id,
            id: req.params.id
        }
    }).then(data => {
        const post = data.get({ plain: true });
        res.json(post);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});



module.exports = router;