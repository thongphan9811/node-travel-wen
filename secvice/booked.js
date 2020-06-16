const bookModel = require('../model/booked');
var createError = require('http-errors')
const create = async (data)=>{
    try{
        const bookClass = new bookModel(data);
        const book = await bookClass.save();
        return book;
    }catch(err){
        throw err;
    }
};
const update = async (IdUser,_id,data)=>{
    try{
        const checkbooking = await bookModel.findOne({CreateBy:IdUser,_id});
        if(!checkbooking){
            throw 'booking khong ton tai';
        }
        const updateBooing = await bookModel.updateOne({_id},data);
        return updateBooing;
    }catch(err){
        throw err;
    }
}
const updateAdmin = async (_id,data)=>{
    const booking = await bookModel.findById(_id);
    booking.set(data);
    const result = await await booking.save();
    return result ; 
}
const updateTourguide = async (tourguiderId,_id,data)=>{
    try{
          const checkTour = await bookModel.findOne({tourguider :tourguiderId ,_id});
          if(!checkTour){
              throw 'ban khong dan tour nay';
          }
          const updateTour = await bookModel.updateOne({_id},data);
          return updateTour;
    }catch(err){
        throw err;
    }
}
const getAllcustomer = async (_id)=>{
    try{
        const allbooking = await bookModel.find({CreateBy:_id}).populate('postID').populate('CreateBy');
        return allbooking;
    }catch(err){
        throw err;
    }
}
const getById = async (_id)=>{
    const booking = await bookModel.findById(_id);
    return booking;
}
const getByCustomerID = async (_id)=>{
    try{
        const book = await bookModel.findOne({createBy : _id});
        return book;
    }catch(err){
        throw err;
    }
}
const gellAllTour = async (tourguiderId)=>{
    try{
        console.log(tourguiderId);
        const tour = await bookModel.find({tourguider :tourguiderId}).populate('postID');
        return tour;
    }catch(err){
        throw err;
    }
}
const getTourByAdmin = async ()=>{
    const arrTour = await bookModel.find().populate('postID').populate('tourguider').populate('CreateBy');
    return arrTour;
}

module.exports = {create,getByCustomerID,getAllcustomer,update,getById,gellAllTour,updateTourguide ,getTourByAdmin,updateAdmin};