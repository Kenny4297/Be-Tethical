const Comment = require('../models/Comment');

const commentSeeds = [
    //Clays comment
    {
        user_id: 1,
        post_id: 2,
        comment_date: "01/01/2022",
        // comment_date: new Date()
        //Or even drop the idea to add a date
        comment_content: "Agreed! Ultimate is a party game, not a fighting game!"
    },
    //Mikes Comment
    {
        user_id: 2,
        post_id: 1,
        comment_date: "01/01/2022",
        comment_content: "Totally BioShock Infinite is my favorite game of all time!!"
    }
];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;