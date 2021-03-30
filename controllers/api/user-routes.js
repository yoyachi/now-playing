const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post } = require('../../models');

// get all users
router.get('/', (req,res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// get one user
router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// create user
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
// update user
router.put('/:id', (req,res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(data);
    })
});
// delete user
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(data => {
          if (!data) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(data);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;