const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    tourGuideID : {type: Schema.Types.ObjectId ,ref :'User'},
    localtionID :{type :Schema.Types.ObjectId ,red: 'Location'},
    name :String,
    description:String,
    conten: String,
    plan:String,
    price : Number,
    image :{type:Array},
    status:{type:String, default:'ACTIVE'},
    isDelete:{type:Boolean, default:false}
})
const PostModel = mongoose.model('Post',schema);
module.exports =PostModel;