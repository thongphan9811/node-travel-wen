var express = require('express');
var router = express.Router();
const midleware = require('../../midleware/Auth');
const controllerPost = require('../../controller/post');

router.get('/',midleware.authAdmin,controllerPost.getAllPost);

router.post('/',midleware.authAdmin,controllerPost.create);
module.exports = router;