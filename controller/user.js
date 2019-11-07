const userService = require('../secvice/user');
const { validateEmail } = require('../hepler/util');
const userModel = require('../model/User');
const Constant = require('../constants/index');
const jwt = require('jsonwebtoken');
const token_key = 'asdasdhs';
const cookie = require('cookie');
const create = async function (req, res) {
    try {
        res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        const body = req.body;
        let role = null
        console.log(body.role);
        if (body.role.toLowerCase() == 'admin') role = Constant.ROLE.ADMIN;
        if (body.role.toLowerCase() == 'customer') role = Constant.ROLE.CUSTOMER;
        if (body.role.toLowerCase() == 'tourguide') role = Constant.ROLE.TOURGUIDE;
        body.role = role;
        const err = validateUser(body);
        if (err) {
            throw err.message;
        };
        const user = await userService.create(body);
        return res.json({ code: 200, mess: "dang ki thanh cong ", data: { user } });
    } catch (err) {
        console.log(err);
        return res.json({ code: 400, mess: "dang ki that bai", data: err.message });
    }
}

const validateUser = function (body) {
    let data = {};
    let err = null;
    if (!body.username) err = 'ban chua nhap name';
    if (!body.email || !validateEmail(body.email)) err = 'ban can nhap lai email dung';
    if (!body.phone) err = 'ban can nhap sdt';
    if (!body.birthDay) err = 'ban can nhap sdt';
    if (!body.password) err = 'ban can nhap pass word';
    // if(body.phone)
    // if (!err) {
    //     for (var key in userModel);
    //     if (body[key]) {
    //         data[key] = body[key];
    //     }
    // 
    return err
}
const login = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email) throw " ban can nhap email";
        if (!password) throw "ban can nhap password";
        const user = await userService.AuthUser(email, password);
        const JsonUser = JSON.parse(JSON.stringify(user));
        const token = jwt.sign(JsonUser, token_key);
        res.setHeader('set-cookie', cookie.serialize('sessoin-token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }))
        return res.redirect('/users/home');
    } catch (err) {
        console.log(err);
        return res.json({
            code: 400, mess: "dang nhap khong thanh cong", data: err.message
        });
    }
};

const home = async (req,res,next)=>{
    try{
        return res.render('index');
    }catch(err){
        next(err);
    }
}
module.exports = { create, login,home };
