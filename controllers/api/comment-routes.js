const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');

router.get('/', (req,res) => {
    Comment.findAll().then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/', (req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id 
    }).then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.put('/:id');

router.delete('/:id');

module.exports = router;