const bookService = require('../secvice/booked');
const inValidateService = require('../secvice/unvali');
var createError = require('http-errors')
const create = async (req, res,next) => {
    try {
        const body = req.body;
        const err = validation(body);
        if (err) throw err;
        body.NumOfPeople = parseInt(req.body.NumOfPeople);
        body.price = body.NumOfPeople * body.price;
        body.startDay = new Date(body.startDay);
        body.endDay = new Date(body.endDay);
        if(body.startDay < new Date() ) throw ' bạn đã đặt ngày bắt đầu nhỏ hơn ngày hiện tại';
        if (body.startDay > body.endDay) throw 'ngay kết thúc bé hơn ngày bắt đầu ';
        const checkbooking = await bookService.getByCustomerID(req.user._id);
        if (checkbooking) {
            if (checkbooking.startDay <= body.startDay && checkbooking.endDay >= body.startDay) 
                throw 'ban da dat trung ngay voi 1 tour bap sap di';
        }
        const checkInVali = await inValidateService.getById(body.tourGuideID);
        if(checkInVali){
            if(checkInVali.startBusy <= body.startDay && checkInVali.endBusy >= body.startDay)
                throw 'ban da dat trung ngay voi ngay ban cua nguoi dan tour';
        }
        const booking = await bookService.create(body);
        return res.json({code :200 , mess :'dat tour thanh cong ', data: booking});
    } catch (err) {
        console.log("lõi")
        console.log(err);
        let httpError = createError(500,err);
        
        return res.status(500).json(httpError);
    }
}
const getAll = async (req,res)=>{
    try{
        const allbooking = await bookService.getAllcustomer(req.user._id);
        console.log(allbooking);
        return res.render('index',{user:req.user ,url : WEB_URL ,view:'menu/yourbooking' ,booking :allbooking});
    }catch(err){
        return res.status(404).json(createError(404,err));
    }
}
const tourguideGetAll = async (req,res)=>{
    try{
        const alltour = await bookService.gellAllTour(req.user._id);
        console.log(alltour);
        return res.render('index',{user:req.user ,url : WEB_URL ,view:'menu/management-yourTour' ,tour :alltour});
    }catch(err){
        res.status(500).json(createError(500,err));
    }
}
const validation = (body) => {
    let err = null;
    if (!body.CreateBy) err = 'ban cần đăng nhập ';
    if (!body.startDay) err = 'khong co ngay checkin';
    if (!body.endDay) err = 'khong co ngay checkout';
    if (!body.NumOfPeople) err = 'khong co so nguoi trong chuyen di';
    return err;
}
const update = async (req,res)=>{
    try{
        const body = req.body;
        if(req.user.role == 'customer'){
            const upBookingUs = await bookService.update(body.CreateBy,body._id,body);
            const booking = await bookService.getById(body._id);
            return res.json(booking);
        }
        if(req.user.role == 'tourguide'){
            const upBookingTGD = await bookService.updateTourguide(body.tourguider,body._id,body);
            const tour = await bookService.getById(body._id);
            return res.json(tour);
        }
    }catch(err){
        res.status(500).json(createError(500,err));
    }
}
module.exports = {create,getAll,update,tourguideGetAll}