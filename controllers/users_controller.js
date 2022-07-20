const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('users_profile',{
            title : 'User Profile',
            profile_user : user
        });
    });
    
}

module.exports.update =  async function(req,res){
   
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('********Multer Error : ', err);

                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }


    }else{
        req.flash('error','You are not authorized!');

        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){

        res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }else{
        console.log('user not found');
        return res.render('user_sign_in',{
            title : "Codeial | Sign In"
        });
    }
    
}


// get sign up data
module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({
        email:req.body.email
    },(err,user)=>{
        if(err){
            console.log('error in finding user in signing up');
            return;
        }

        if(!user){
            User.create(req.body , (ree,user)=>{
                console.log('error in creating user while signing up');
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success','Successfully Signed Up');

            return res.redirect('back');
        }
    })

}

// sign in and create a session for user
module.exports.createSession = (req,res)=>{
    req.flash('success','Logged in Successfully');

    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    

    req.logout((err)=>{
        if(err){
            return next(err);
        }
    });
    req.flash('success', 'You have logged out!');

    return res.redirect('/');
}