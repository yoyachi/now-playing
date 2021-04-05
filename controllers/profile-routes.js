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
        order: [['created_at', 'DESC']],
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
                attributes: ['username', 'location', 'bio']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('profile', {
            posts,
            loggedIn: true,
            user: {
                username: req.session.username,
                location: req.session.location,
                email: req.session.email,
                bio: req.session.bio,
                user_id: req.session.user_id
            }
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
router.get('/:id', (req,res) => {
    if(Number(req.params.id) === Number(req.session.user_id)) {
        res.redirect('/profile/user');
    }
    Post.findAll({
        where: {
            user_id: req.params.id
        },
        order: [['created_at', 'DESC']],
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
                attributes: ['id', 'username', 'email', 'bio', 'location']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        let user = posts[0].user;
        console.log(user);
        res.render('profile', {
            posts,
            loggedIn: req.session.loggedIn,
            user: {
                username: user.username,
                location: user.location,
                email: user.email,
                bio: user.bio,
                user_id: user.id
            }
        })
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
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



module.exports = router;