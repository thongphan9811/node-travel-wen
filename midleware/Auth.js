const jwt = require('jsonwebtoken');
var cookie = require('cookie');
const createError = require('http-errors');

const token_key = 'asdasdhs';
const authTourGuide = async (req, res, next) => {
    try {
        const cookiess = cookie.parse(req.headers.cookie || '');
        const token = cookiess['sessoin-token'];
        if (!token) throw "ban can dang nhap";
        const decode = await jwt.verify(token, token_key);
        req.user = decode;
        if (req.user.role != "tourguide") throw "ban khong co quyen su dung chuc nang nay";
        next()
    } catch (err) {
        return res.json({
            code: 400,
            mess: err
        });
    };
};

const authUsers = async (req, res, next) => {
    try {
        const cookiess = cookie.parse(req.headers.cookie || '');
        const token = cookiess['sessoin-token'];
        if (!token) { req.user = null; return next(); }
        const decode = await jwt.verify(token, token_key);
        req.user = decode;
        return next();
    } catch (err) {
        console.log("huhuhuhu");
        return res.json({
            code: 400,
            mess: err,
            data: null
        });
    }
}
const authCustomer = async (req, res, next) => {
    try {
        const cookiess = cookie.parse(req.headers.cookie || '');
        const token = cookiess['sessoin-token'];
        if (!token) {
            req.user = null;
            throw 'ban can dang nhap ' ;
        }
        const decode = await jwt.verify(token, token_key);
        req.user = decode;
        return next();
    } catch (err) {
       return res.status(400).json(createError(400,'ban can dang nhap'));
    }
}
const authAdmin = async (req, res, next) => {
    try {
        const cookiess = cookie.parse(req.headers.cookie || '');
        const token = cookiess['sessoin-token'];
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, token_key);

        req.user = decode;
        if (req.user.role != "admin") throw "ban khong co quyen su dung chuc nang nay";
        next();
    } catch (err) {
        console.log(err);
        return res.json({
            code: 400,
            mess: err,
            data: null
        });
    }
}

const authAdminTourGuide = async (req, res, next) => {
    try {
        const cookiess = cookie.parse(req.headers.cookie || '');
        const token = cookiess['sessoin-token'];
        
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, token_key);
        req.user = decode;
        if ( req.user.role == 'customer' ) throw "ban khong co quyen su dung chuc nang nay";
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json(createError(500,err));
    }
}
const authLogin = async (req, res, next) => {
    try {
        const cookiess = cookie.parse(req.headers.cookie || '');
        const token = cookiess['sessoin-token'];
        if (token) {
            const decode = await jwt.verify(token, token_key);
            req.user = decode;
            if (req.user.role == 'admin') {
                return res.redirect('/users/admin');
            }
            console.log("huhuhu")
            return res.redirect('/users/home');
        }
        return next();
    } catch (err) {
        res.json({ code: 400, mess: err });
    }
}

module.exports = { authUsers, authTourGuide, authAdmin, authAdminTourGuide, authLogin, authCustomer };
