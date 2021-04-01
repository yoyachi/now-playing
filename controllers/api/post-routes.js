const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post } = require('../../models');

// get all posts
router.get('/', (req,res) => {
    Post.findAll().then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
// get one post
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});
// create post
router.post('/', (req,res) => {
    Post.create({
        artist: req.body.artist,
        album_title: req.body.album_title,
        genre: req.body.genre,
        photo_url: req.body.photo_url,
        user_id: req.session.user_id
    }).then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
});
// update post
router.put('/:id', (req,res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
// delete post
router.delete('/:id', (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

module.exports = router;