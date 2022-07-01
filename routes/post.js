const express = require('express');

const router = express.Router();

const usersPost = require('../controllers/usersPost_controller');

router.get('/post',usersPost.post);

module.exports = router;