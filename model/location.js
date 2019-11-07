const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    createBy:{type:Schema.Types.ObjectId},
    nameLocation :{type:String ,unique:true , require:true},
    description:String,
    isDelete :{type:Boolean , default :false}
});
schema.pre('save',async function(next){
    try{
        if(this.isNew){
            const nameLocationQuery = await locationModel.findOne({nameLocation:this.nameLocation});
            if(nameLocationQuery) throw new Error('ten location da ton tai');
        }
        next();
    }catch(err){
        throw new Error(err.message);
    }
})
const locationModel = mongoose.model('Location',schema);
module.exports = locationModel;

