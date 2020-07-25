var express = require('express');
var router = express.Router();
const midleware = require('../../midleware/Auth');
const controllerBook = require('../../controller/booked');

router.get('/',midleware.authAdmin,controllerBook.adminGetBooked);
router.post('/',midleware.authAdmin,controllerBook.adminUpdateBook);

module.exports =router;