const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// homepage
router.get('/', (req,res) => {
    if(!req.session.login) {
        res.redirect('/login');
        return;
    }
    res.json({ message: 'this will be the users profile' });
});
// edit users information
router.get('/edit', (req,res) => {
    if(!req.session.login) {
        res.redirect('/login');
        return;
    }
    res.json({ message: 'edit users page' });
});
// page to create a post
router.get('/post', (req,res) => {
    if(!req.session.login) {
        res.redirect('/login');
        return;
    }
    res.json({ message: 'this page will be to create a post' });
});


module.exports = router;