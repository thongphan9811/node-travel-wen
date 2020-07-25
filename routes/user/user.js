var express = require('express');
var router = express.Router();
const token_key = 'asdasdhs';

const midleware = require('../../midleware/Auth');

const UserController = require('../../controller/user');
router.get('/home',midleware.authUsers,UserController.home);
router.post('/register',UserController.create);
router.get('/login',midleware.authLogin, UserController.getLoginform);
router.post('/login', UserController.login);
router.get('/logout',UserController.logout);
router.get('/profile',midleware.authUsers,UserController.getProfileForm);
router.get('/register',UserController.getPageRegister);
// Admin
router.get('/home/qluser',midleware.authAdmin,UserController.getallUser);
router.get('/admin',midleware.authAdmin,UserController.adminhome);
router.post('/home/qluser',midleware.authUsers,UserController.update);


module.exports = { router, token_key }