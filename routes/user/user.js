var express = require('express');
var router = express.Router();
const token_key = 'asdasdhs';
const UnvaliableModel = require('../../model/unvaliableDay');
const midleware = require('../../midleware/Auth');
const postModel = require('../../model/post');
const bookModel = require('../../model/booked');
const UserController = require('../../controller/user');
//register
router.get('/home',UserController.home);
router.post('/register',UserController.create);
router.get('/login', function(req,res,next){
    try{
        return res.render('login',{url:WEB_URL});
    }catch(err){
        console.log(err);
        next(err);
    };
});
router.post('/login', UserController.login)
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