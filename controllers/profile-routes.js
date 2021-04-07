const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Vote } = require('../models');

// homepage
router.get('/user', (req,res) => {
    // if not logged in
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    // query to find all posts
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
                attributes: ['id', 'username', 'location', 'bio', 'email']
            },
            {
                model: Vote,
                attributes: ['user_id', 'post_id']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        // if there are no posts, query for a user instead
        if (!posts[0]) {
            User.findOne({
                where: {
                    id: req.session.user_id
                }
            }).then(data => {
                const user = data.get({ plain: true });
                res.render('profile', {
                    posts,
                    loggedIn: true,
                    user,
                    user_profile: true
            });
            })
        // query successful so we can use the user data from posts
        } else {
            posts.map(post => {
                post.loggedIn = true;
            });
            
            res.render('profile', {
                posts,
                loggedIn: true,
                user: posts[0].user,
                user_profile: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});

// page to create a post
router.get('/post', (req,res) => {
    // checks to see if logged in
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render("add-post", {
        loggedIn: req.session.loggedIn
    });
});
// page for viewing either users page, or another users page
router.get('/:id', (req,res) => {
    // if the user is trying to look at their own page, they will be redirected to /profile/user
    if(Number(req.params.id) === Number(req.session.user_id)) {
        res.redirect('/profile/user');
    }
    // if the user is not redirected, a query is made to find all posts for the specified user
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
            },
            {
                model: Vote,
                attributes: ['user_id', 'post_id']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        let userStuff;
        // if the user has no posts query for a user instead of their posts
        if(posts.length === 0) {
            // user query
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
            }).catch(err => res.status(404).json(err));
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
// edit users post
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

// edit users profile
router.get('/edit-profile/:id', (req,res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    User.findOne({
        where: {
            id: req.session.user_id,
        }
    }).then(data => {
        const user = data.get({ plain: true });
        res.render('edit-profile', {
            user,
            loggedIn: true
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});



module.exports = router;