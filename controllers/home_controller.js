const { populate } = require('../models/post');
const Post = require('../models/post');

module.exports.home = function(req,res){
    
    // Post.find({},(err,posts)=>{
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts : posts
    //     });
    // });

    // populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        // if(err){
        //     console.log('error in populating.')
        // }
        return res.render('home',{
            title: "Codeial | Home",
            posts : posts
        });
    })
    
    
    // return res.end('<h1>Express is up for codeial</h1>')
}


// module.exports.actionName = function(req,res){}