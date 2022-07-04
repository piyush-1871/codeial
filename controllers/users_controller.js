const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , (err,user)=>{
            if(user){
                return res.render('users_profile',{
                    title : "User Profile",
                    user : user
                })
            }else{
                return res.redirect('/user/sign-in')
            }
        });
    }else{
        return res.redirect('/users/sign-in');
    }
    
    // res.end('<h1>User profile</h1>');
}

// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    });
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
            return res.redirect('back');
        }
    })

}

// sign in and create a session for user
module.exports.createSession = (req,res)=>{
    // steps to authenticate:
    // find the user 
    // User.findOne({
    //     email : req.body.email
    // },(err,user)=>{
    //     if(err){
    //         console.log('error in finding user in signing in');
    //         return;
    //     }
    //     // handle user found
    //     if(user){

    //     // handle password which doesn't match
    //     if(user.password != req.body.password){
    //         return res.redirect('back');
    //     }
    //     // handle session creation
    //     res.cookie('user_id',user.id);
    //     return res.redirect('/users/profile');
        
    //     }else{
    //     // handle user not found
    //     return res.redirect('back');
    //     }

    // });

    return res.redirect('/');
}

module.exports.signOut = (req,res)=>{
    console.log(req.cookies);

    res.clearCookie('user_id');

    return res.redirect('/users/sign-in');
}