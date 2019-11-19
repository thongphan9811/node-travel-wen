var express = require('express');
var router = express.Router();
const midleware = require('../../midleware/Auth');
const controllerLocation = require('../../controller/location');

router.get('/',midleware.authAdmin,controllerLocation.getAll);

router.post('/',midleware.authAdmin,controllerLocation.create);

router.post('/updateLocation',midleware.authAdmin,controllerLocation.update);


module.exports =router;