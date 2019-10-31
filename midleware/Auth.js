const jwt = require('jsonwebtoken');
const userRouter = require('../routes/user/user');
const formidable = require('formidable');
const postModel = require('../model/post');
const token_key = 'asdasdhs';
const authTourGuide = async (req, res, next) => {
    try {
        const token = req.header('sessoin-token');
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
        const token = req.header('sessoin-token');
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, token_key);
        req.user = decode;
       // console.log(UserRouter.token_key);
        next();
    } catch (err) {
        return res.json({
            code: 400,
            mess: err,
            data: null
        });
    }
}
const authAdmin = async (req, res, next) => {
    try {
        console.log(UserRouter.token_key);
        const token = req.header('sessoin-token');
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, token_key);
        req.user = decode;
        console.log(decode);    
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
        console.log(UserRouter.token_key);
        const token = req.header('sessoin-token');
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, token_key);
        req.user = decode;
        console.log(decode);    
        if (req.user.role != "admin"||req.user.role!="tourguide") throw "ban khong co quyen su dung chuc nang nay";
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
module.exports = { authUsers, authTourGuide, authAdmin,authAdminTourGuide };
