const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    createBy : {type:Schema.Types.ObjectId, ref : 'User'},
    startBusy : Date,
    endBusy :Date,
    status : {type :Boolean , default :false}
});

const unValiModel = mongoose.model('Unvaliable',schema);
module.exports = unValiModel;