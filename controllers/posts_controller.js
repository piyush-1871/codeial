const Post = require('../models/post')


module.exports.create = function(req,res){
    console.log('user',req.user);
    Post.create({
        content : req.body.content,
        user : req.user.id
    },(err,post)=>{
        if(err){
            console.log('error in creating the post.');
            return;
        }
        return res.redirect('back');
    })
}