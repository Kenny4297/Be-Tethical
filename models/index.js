const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');


//Associations

//Associations
//COMMENTS
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Post);

//POSTS
Post.belongsTo(User);
Post.hasMany(Comment);

//USERS
User.hasMany(Comment);
User.hasMany(Post);

module.exports = { Comment, Post, User };

//! Before "delete individual post" fix
//COMMENTS
// Comment.belongsTo(User, { foreignKey: 'user_id'});

// Comment.belongsTo(Post, { foreignKey: 'post_id'});

// //POSTS
// Post.belongsTo(User, { foreignKey: 'user_id'});

// Post.hasMany(Comment, { 
//     foreignKey: 'post_id',
//     onDelete: "NO ACTION"
// });

// //USERS
// User.hasMany(Comment, { foreignKey: 'user_id'});

// User.hasMany(Post, { foreignKey: 'user_id'})

// module.exports = { Comment, Post, User };


