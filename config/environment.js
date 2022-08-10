const development = {
    name : "development",
    asset_path : '/assets',
    session_cookie_key : 'jghv',
    db : 'codeial_development',
    smtp : {
        
        service : 'gmail',
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : 'piyush1871b@gmail.com',
            pass : 'jwubtlecfectvqtv'
        }
        
    },
    google_client_id : "375333308917-1174fu6k9sf1k7aeor2570b7n9aoro2p.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'
}

const production = {
    name : "production"
}

module.exports = development;