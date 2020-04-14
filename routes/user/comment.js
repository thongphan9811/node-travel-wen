const express = require('express');
const router = express.Router();
const midleware = require('../../midleware/Auth');

router.get('/',midleware.authUsers,)


module.exports = { router }