const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    console.log('user',req.user);

    try{
        await Post.create({
            content : req.body.content,
            user : req.user.id
        });
    
        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
    }

    

}

module.exports.destroy = async (req,res)=>{


    try{
        let post = await Post.findById(req.params.id);



        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            return  res.redirect('back');
        }else{
            res.redirect('back');
        } 
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}