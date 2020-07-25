var express = require('express');
var router = express.Router();
const midleware = require('../../midleware/Auth');
const controller = require('../../controller/rate');

router.get('/',midleware.authAdmin,controller.manager);

module.exports =router;