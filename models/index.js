const User = require('./User');
const Post = require('./Post');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// create reverse association
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };
