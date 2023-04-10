const Post = require('../models/post');
const User = require('../models/user');

//1.here we declare this functio to be asynchronous
module.exports.home =  async function(req,res){

    try{


        //populate the user of each post
        //2.then we waited for this post to get completed
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
            path: 'user'
            }
        });
        
        //3.then we awaited for this user query to be completed
        let users = await User.find({});
        
        //4.and then return something to the browser
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });


    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

//using then 
// Post.find({}).populate('comments').then(function());

//OR
// let posts = Post.find({}).populate('comments').exec();
// posts.then()

//now async await 
