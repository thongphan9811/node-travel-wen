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
        if (body.role == null) role = Constant.ROLE.CUSTOMER;
        body.role = role;
        const err = validateUser(body);
        if (err) {
            throw err.message;
        };
        const user = await userService.create(body);
        if (req.user.role == 'admin') return res.redirect('/users/home/qluser');
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
    //if (!body.birthDay) err = 'ban can nhap ';
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
        res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
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
        if (user.role == "customer" || user.role == 'tourguide')
            return res.redirect('/users/home');
        if (user.role = 'admin') {
            return res.redirect('/users/admin');
        };
    } catch (err) {
        console.log(err);
        return res.json({
            code: 400, mess: "dang nhap khong thanh cong", data: err.message
        });
    }
};
const home = async (req, res, next) => {
    try {
        let user = req.user;
        if (!req.user) {
            user = null;
        }
        return res.render('index', { url: WEB_URL, user: user });
    } catch (err) {
        next(err);
    }
};
const adminhome = async (req, res) => {
    try {
        if (!req.user) req.user = null;
        return res.render('adminhome', { url: WEB_URL, user: null, view: 'admin/main', author: req.user });
    } catch (err) {
        console.log(err);
        return res.json({ data: err });
    }
}
const update = async (req, res) => {
    try {
        const data = req.body;
        const role = req.user.role;
        if (role == 'admin') {
            const userUpdate = await userService.update(data._id, data);
            return res.redirect('/users/home/qluser');
        } else {
            const checkUser = await userService.getByID(body._id);
            if (checkUser._id.toString() != req.user._id) throw 'canh bao ban dang update user khac';
            const userUp = await userService.update(data);
            return res.redirect('/home/qluser');
        }
    } catch (err) {
        return res.json({ data: err });
    }
}
const getallUser = async (req, res) => {
    try {
        const user = await userService.getAllUser();
        console.log('===================',user);
        return res.render('adminhome', { url: WEB_URL, user: user, view: 'admin/tableUser', author: req.user });
    } catch (err) {
        console.log(err);
        return res.json({ data: err });
    }
}
const getLoginform = async (req, res) => {
    try {
        return res.render('login', { url: WEB_URL });
    } catch (err) {
        console.log(err);
        next(err);
    };
}
const logout = async (req, res) => {
    try {
        res.clearCookie('sessoin-token'); res.redirect('/users/home');
    } catch (err) {
        return err;
    }
}
module.exports = { create, login, home, adminhome, getallUser, update, getLoginform, logout };

{/* <form action="/action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form>

nhưng dùng <input type="hidden" id="custId" name="custId" value="3487"></input> */}