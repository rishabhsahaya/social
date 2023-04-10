const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
//router.post('/create-session', usersController.createSession);

//use passport as a middleware to authenticate;
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);

//here scope is inf. that we are willing to fetch
router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));

//this is the url at which I will receive the data
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports = router;