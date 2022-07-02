module.exports.profile = function(req,res){
    res.render('users_profile',{
        title: "users profile"
    })
    
    // res.end('<h1>User profile</h1>');
}