const express = require('express');
const router = express.Router();
const midleware = require('../../midleware/Auth');
const rateController = require('../../controller/rate');

router.post('/',midleware.authCustomer,rateController.create);

module.exports =  router 