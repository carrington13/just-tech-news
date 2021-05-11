const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment } = require('../models')


// Sends/Renders Homepage File Because File is Handled by Handlebars
router.get('/', (req, res) => {
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
          res.render('homepage', { posts });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});




module.exports = router;