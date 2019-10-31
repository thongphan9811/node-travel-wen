const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    postID:{type:Schema.Types.ObjectId ,ref:'Post'},
    CreateBy:{type:Schema.Types.ObjectId ,ref:'User'},
    NumOfPeople:Number,
    price :Number,
    note :String,
    isDelete:{type:Boolean, default:false},
    startDay: Date,
    endDay:Date,
    Day :Number
});
const bookedModel = mongoose.model('booked',schema);
module.exports=bookedModel;