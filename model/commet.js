const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    commentBy:{type:Schema.Types.ObjectId,ref:'User'},
    postID: {type:Schema.Types.ObjectId,ref:'Post'},
    comment :String,
    createAt :Date,
    isDelete:{type:Boolean, default :false}
});
const commentModel = mongoose.model('Comment',schema);
module.exports= commentModel;