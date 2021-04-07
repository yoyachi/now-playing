const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Vote } = require('../models');
const { Op } = require('sequelize');

// homepage
router.get('/', (req,res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    Post.findAll({
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
                attributes: ['id', 'username', 'email', 'bio']
            },
            {
                model: Vote,
                attributes: ['user_id', 'post_id']
            }
        ],
        order: [['created_at', 'DESC']],
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            homepage: true
          });
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});
//search
router.get('/search', (req,res) => {
    // console.log(req.query.input);
    // res.render('search', {
    //     loggedIn: req.session.loggedIn
    // });
    if (!req.query.input) {
        res.render('search', {
            loggedIn: req.session.loggedIn
        });
        return;
    }

    User.findAll({
        where: {
            username: {
                [Op.like]: '%' + req.query.input + '%'
            }
        }
    }).then(data => {
        const users = data.map(user => user.get({ plain: true }));
        res.render('search', {
            users,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => res.status(404).json(err));
    
});
// profile page
router.get('/profile', (req,res) => {
    res.render("profile");
});

// login page
router.get('/login', (req,res) => {
    res.render("login");
});

// singup page
router.get('/signup', (req,res) => {
    res.render("signup");
});

// look for posts based on genre
router.get('/:genre', (req,res) => {
    Post.findAll({
        where: {
            genre: req.params.genre
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
                attributes: ['username']
            },
            {
                model: Vote,
                attributes: ['user_id', 'post_id']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.user_id,
            homepage: true
        })
    })
});
// single post
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'id']
                    }
                ]
            },
            {
                model: Vote,
                attributes: ['user_id', 'post_id']
            }
        ]
    }).then(data => {
        const posts = data.get({ plain: true });
        let voted = false;
        posts.comments.map(comment => {
            if(comment.user_id === req.session.user_id) {
                comment.loggedIn = true;
                return;
            }
            comment.loggedIn = false;
        });
        posts.votes.map(user => {
            if(Number(user.user_id) === Number(req.session.user_id)){
                voted = true;
            }
        })
        res.render('single-post', {
            posts,
            loggedIn: req.session.loggedIn,
            voted
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});





module.exports = router;