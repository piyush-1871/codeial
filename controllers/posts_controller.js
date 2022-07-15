const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    

    try{
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });

        if(req.xhr){           
            // for populating the name of the user but not password
            post = await post.populate('user','name').execPopulate();
            return res.status(200).json({
                data : {
                    post : post
                },
                message : "Post Created !"
            })
        }

        req.flash('success','Post Published');
    
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
       
    }

    

}

module.exports.destroy = async (req,res)=>{


    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : "Post Deleted Successfully"
                });
            }

            req.flash('success','Post Deleted');

            return  res.redirect('back');
        }else{
            req.flash('Error','You Cannot Delete This Post!');

            res.redirect('back');
        } 

    }catch(err){
        req.flash('error',err);
       
        return res.redirect('back');

    }
    
}