const Post = require('../models/Post');

const postsSeeds = [
    //Clay's post
    {
        user_id: 1, 
        post_date: "01/01/2022",
        post_title: "BioShock Infinite",
        post_content: "BioShot Infinite's story line is the best storyline in any video game!!"
    },
    //Mike's post
    {
        user_id: 2, 
        post_date: "01/01/2022",
        post_title: "Super Smash Bros. Melee",
        post_content: "Melee is better than ultimate!!"
    },
];

const seedPosts = () => Post.bulkCreate(postsSeeds);

module.exports = seedPosts;