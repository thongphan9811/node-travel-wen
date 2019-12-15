const express = require('express');
const router = express.Router();
const bookingController = require('../../controller/booked');
const midleware = require('../../midleware/Auth');
router.post('/',midleware.authCustomer,bookingController.create);
router.get('/history',midleware.authUsers,bookingController.getAll);
router.put('/',midleware.authCustomer,bookingController.update);
router.get('/manament',midleware.authUsers,bookingController.tourguideGetAll);
module.exports = router;