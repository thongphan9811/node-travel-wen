const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    rateBy:{type:Schema.Types.ObjectId,ref:'User'},
    postID: {type:Schema.Types.ObjectId,ref:'Post'},
    rate :Number,
    commentRate :String,
    createAt :Date,
    isDelete:{type:Boolean, default :false}
});