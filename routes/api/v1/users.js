// this is required to run the code of controolers->api->v1->users_api.js
const express = require('express');
const router = express.Router();

const usersApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session', usersApi.createSession);

module.exports = router;
