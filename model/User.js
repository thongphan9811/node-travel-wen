const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../constants')
const schema = new Schema({
    name: {type :String },
    email:{type :String },
    phone : Number,
    birthDay: Date,
    password :String,
    role : {type:String ,default :constants.ROLE.CUSTOMER },
    isDelete:{type:Boolean, default :false}
});
const UserModel = mongoose.model('User',schema);
module.exports = UserModel;