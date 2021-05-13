const router = require('express').Router();
const { Sequelize } = require('sequelize/types');
const sequelize = require('../config/connection');
const {Post, User, Comment } = require('../models')


// Sends/Renders Homepage File Because File is Handled by Handlebars
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
           'id',
           'post_url',
           'title',
           'created_at',
           [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)')]
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                includes: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
      .then(dbPostData => {
          // loops through returned Sequelized object and turns into a serialized version of itself
          const posts = dbPostData.map(post => post.get({ plain: true }));
          // Add posts to an object to prevent future headaches later on when adding other properties to the template
          res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// ROUTE FOR LOGIN PAGE
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// ----------------------
// ROUTES FOR SINGLE_POST
// ----------------------

router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [Sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post_id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
            }
      
            // serialize the data
            const post = dbPostData.get({ plain: true });
      
            // pass data to template
            res.render('single-post', { post });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });

          res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn
          });
    })




module.exports = router;