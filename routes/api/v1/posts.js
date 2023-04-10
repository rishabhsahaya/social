const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postsApi.index);

//this will put an authentication check over my passport
//because we do not session cookie to be generated thats why session:false
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);


module.exports = router;