const express = require('express');
const router = express.Router();
const midleware = require('../../midleware/Auth');
const commentController = require('../../controller/comment');

router.post('/',midleware.authCustomer,commentController.create);

module.exports =  router 