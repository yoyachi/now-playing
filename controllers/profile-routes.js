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
                attributes: ['id', 'username', 'location', 'bio']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        posts.map(post => {
            post.loggedIn = true;
        });
        let userProfile = true;
        res.render('profile', {
            posts,
            loggedIn: true,
            user: {
                username: req.session.username,
                location: req.session.location,
                email: req.session.email,
                bio: req.session.bio,
                user_id: req.session.user_id
            },
            user_profile: userProfile
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
        let userStuff;
        if(posts.length === 0) {
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(data => {
                userStuff = data.get({ plain: true });
                res.render('profile', {
                    loggedIn: req.session.loggedIn,
                    user: userStuff,
                    user_profile: false
                })
            })
        } else {
            userStuff = posts[0].user;
            res.render('profile', {
                posts,
                loggedIn: req.session.loggedIn,
                user: userStuff
            })
        }
        
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