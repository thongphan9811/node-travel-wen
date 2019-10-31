var express = require('express');
var router = express.Router();
const UserModel = require('../../model/User');
const bcrypt = require('bcrypt');
const Constant = require('../../constants/index');
const token_key = 'asdasdhs';
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const UnvaliableModel = require('../../model/unvaliableDay');
const midleware = require('../../midleware/Auth');
const postModel = require('../../model/post');
const bookModel = require('../../model/booked');
//register
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, birthDay, password, role } = req.body;
        const date = birthDay.split('-');
        const MyDate = new Date(date[0], date[1] - 1, date[2]);
        if (!email) throw " bạn cần nhập email";
        if (!password) throw "bạn cần nhập password";
        //kiem tra email da ton tai chua
        const checkUser = await UserModel.findOne({ email });
        if (checkUser) throw "email đã được đăng ký";
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        switch (role.toLowerCase()) {
            case 'customer':
                try {
                    const ClassUser = new UserModel({ name, email, phone, birthDay: MyDate, password: hash, role: Constant.ROLE.CUSTOMER });
                    //save customer
                    const customer = await ClassUser.save();
                    return res.json({
                        code: 200,
                        mess: " dang ki thanh cong ,chao mung customer",
                        data: customer
                    })
                } catch (err) {
                    const error = { staus: 400, stack: err }
                    return res.render('error', error);
                }
            case 'tourguide':
                try {
                    console.log("hihihi");
                    const ClassTourGuide = new UserModel({ name, email, phone, birthDay: MyDate, password: hash, role: Constant.ROLE.TOURGUIDE });
                    const tourguide = await ClassTourGuide.save();
                    console.log(tourguide);
                    if (tourguide) {
                        try {
                            console.log("hihihi")
                            const unvaliClass = new UnvaliableModel({ createBy: tourguide._id });
                            const UnvaliSave = await unvaliClass.save();
                        } catch (err) {
                            console.log(err);
                            return
                        }

                    }
                    return res.json({
                        code: 200,
                        mess: " dang ki thanh cong ,chao mung tourguide",
                        data: tourguide
                    })
                } catch (err) {
                    const error = { staus: 400, stack: err }
                    return res.render('error', error);
                }
            case 'admin':
                try {
                    const ClassTourGuide = new UserModel({ name, email, phone, birthDay: MyDate, password: hash, role: Constant.ROLE.ADMIN });
                    const admin = await ClassTourGuide.save();

                    return res.json({
                        code: 200,
                        mess: " dang ki thanh cong ,chao mung admin",
                        data: admin
                    })
                } catch (err) {
                    const error = { staus: 400, stack: err }
                    return res.render('error', error);
                }
        }
    } catch (error) {
        return res.json({ code: 400, mess: error, data: null });
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) throw " ban can nhap email";
        if (!password) throw "ban can nhap password";
        const findUser = await UserModel.findOne({ email });
        if (!findUser) throw "ban chua dang ky hoac nhap sai email";
        const checkPass = await bcrypt.compareSync(password, findUser.password);
        if (!checkPass) throw "ban nhap sai password";
        findUser.password = undefined;
        findUser.email = undefined;
        const JsonUser = JSON.parse(JSON.stringify(findUser));
        const token = jwt.sign(JsonUser, token_key);
        res.setHeader('set-cookie', cookie.serialize('sessoin-token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }));
        return res.json({
            code: 200,
            mess: "dang nhap thanh cong",
            data: { JsonUser }
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 400,
            mess: err
        })
    }
})
router.post('/booking', midleware.authUsers, async (req, res) => {
    try {
        const { postID, note } = req.body;
        if (!postID) throw "ban can nhap ma id post ";
        let NumOfPeople = parseInt(req.body.NumOfPeople) //? NumOfPeople : 1;
        const checkPost = await postModel.findById(postID);
        const checkcustomerBook = await bookModel.findOne({CreateBy:req.user._id,postID:checkPost._id});
        //if(checkcustomerBook) throw "ban da booking tour nay roi";
        if (!checkPost) throw 'khong co bai post ';
        const price = checkPost.price * NumOfPeople;
        const startDay = req.body.startDay.split('-');
        const start = new Date(startDay[0], startDay[1] - 1, startDay[2]);
        const endDay = req.body.endDay.split('-');
        const end = new Date(endDay[0], endDay[1] - 1, endDay[2]);
        const checkBooked = await bookModel.findOne({ CreateBy: req.user._id });
        console.log(checkBooked);
        if (checkBooked) {
            if (checkBooked.startDay <= start && checkBooked.endDay >= start) throw "ban da dat trung ngay voi tour truoc";
        }
        // test check 1 truong || khi pass hay recode lai de co the check duoc nhieu truong hop
        const checkUnvali = await UnvaliableModel.findOne({ createBy: checkPost.tourGuideID });
        if (checkUnvali) {
            if (checkUnvali.startBusy <= start && checkUnvali.endBusy >= start) throw " tourgide cua tour da ban ";
        }
        const bookClass = new bookModel({ postID, CreateBy:req.user._id, NumOfPeople, price, note, startDay: start, endDay: end });
        const booksave = bookClass.save();
        return res.json({ code: 200, mess: "booking thanh cong ", data: bookClass });
    } catch (err) {
        console.log(err);
        return res.json({ code: 400, mess: "booking khong thanh cong ", data: err });
    }
});

module.exports = { router, token_key }