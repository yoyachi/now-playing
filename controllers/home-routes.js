const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// homepage
router.get('/', (req,res) => {
    res.render('layouts/main');
});

// login page
router.get('/login', (req,res) => {
    res.json({message: 'this will be the login page '});
});



module.exports = router;