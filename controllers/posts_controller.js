const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = (req,res)=>{
    Post.findById(req.params.id, (err,post)=>{
        // .id converts the object id to string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id}, function(err){
                return res.redirect('back');
            })
        }else{
            res.redirect('back');
        }
    })
}