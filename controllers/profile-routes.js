const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

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
                model: Comment,
                attributes: ['comment_text', 'user_id', 'post_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('profile', {
            posts,
            loggedIn: true,
            username: req.session.username,
            email: req.session.email
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
    res.render("add-post");
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
        res.render('edit-post', {
            post,
            loggedIn: true
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
router.get('/:id', (req,res) => {
    if(Number(req.params.id) === Number(req.session.user_id)) {
        res.redirect('/profile/user');
    }
    Post.findAll({
        where: {
            user_id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'user_id', 'post_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
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
        })
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
});


module.exports = router;