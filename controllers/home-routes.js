const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

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
                attributes: ['username']
            }
        ],
        order: [['created_at', 'DESC']],
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
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.user_id
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
                attributes: ['username']
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
            }
        ]
    }).then(data => {
        const posts = data.get({ plain: true });
        posts.comments.map(comment => {
            if(comment.user_id === req.session.user_id) {
                comment.loggedIn = true;
                return;
            }
            comment.loggedIn = false;
        });
        res.render('single-post', {
            posts,
            loggedIn: req.session.loggedIn,
            
            
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});





module.exports = router;