module.exports.profile = function(req,res){
    res.render('users',{
        title: "users profile"
    })
    
    // res.end('<h1>User profile</h1>');
}