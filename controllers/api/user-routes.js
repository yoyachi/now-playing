const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, Vote } = require('../../models');

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

// create user
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        bio: req.body.bio
    }).then(data => {
        req.session.save(() => {
          req.session.user_id = data.id;
          req.session.username = data.username;
          req.session.email = data.email;
          req.session.location = data.location;
          req.session.bio = data.bio;
          req.session.loggedIn = true;
    
          res.json({ user: data, message: 'You are now logged in!' });
    })}).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
//login
router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.location = dbUserData.location;
        req.session.bio = dbUserData.bio;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
  });
  //logout
  router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  // get one user
router.get('/:id', (req,res) => {
  User.findOne({
      attributes: { exclude: ['password'] },
      where: {
          id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'post_text']
        },
        {
          model: Post,
          attributes: ['title'],
          through: Vote,
          as: 'voted_posts'
        }
      ]
  }).then(data => res.json(data))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
// update user
router.put('/:id', (req,res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }

          req.session.save(() => {
            req.session.bio = req.body.bio;
      
            res.json({ user: data, message: 'Y' });
          });
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