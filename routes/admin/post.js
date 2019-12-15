var express = require('express');
var router = express.Router();
const midleware = require('../../midleware/Auth');
const controllerPost = require('../../controller/post');

router.get('/',midleware.authAdmin,controllerPost.getAllPost);

router.post('/',midleware.authAdminTourGuide,controllerPost.create);
router.post('/update',midleware.authAdminTourGuide,controllerPost.update);
router.get('/detail/:_postID',midleware.authUsers,controllerPost.getdettail);//
router.get('/myPost',midleware.authAdminTourGuide,controllerPost.getMyPost);
module.exports = router;