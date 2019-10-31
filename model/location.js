const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    createBy:{type:Schema.Types.ObjectId},
    nameLocation : String,
    description:String,
    isDelete :{type:Boolean , default :false}
});
const locationModel = mongoose.model('Location',schema);
module.exports = locationModel;

