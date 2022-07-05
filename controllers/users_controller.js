const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('users_profile',{
        title : 'User Profile'
    })
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
    }
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
    

    return res.redirect('/');
}

// module.exports.signOut = (req,res)=>{
//     console.log(req.cookies);

//     res.clearCookie('user_id');

//     return res.redirect('/users/sign-in');
// }