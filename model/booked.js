const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var createError = require('http-errors')
const schema = new Schema({
    postID:{type:Schema.Types.ObjectId ,ref:'Post'},
    tourguider:{type:Schema.Types.ObjectId ,ref:'User'},
    CreateBy:{type:Schema.Types.ObjectId ,ref:'User'},
    NumOfPeople:Number,
    price :Number,
    note :String,
    isDelete:{type:Boolean, default:false},
    startDay: Date,
    endDay:Date,
    status:{type: String ,default:'AWAIT'},
    Day :Number
});

schema.pre('save',async function(next){
    try{
        if(this.isNew){
            const checked = await bookedModel.findOne({CreateBy:this.CreateBy ,postID:this.postID});
            console.log(checked,this.CreateBy,this.postID);
            if(checked) throw 'ban da đặt tour này rồi';
            return next();
        }
    }catch(err){
        let httpError = createError(500,err);
        throw err
    }
})

const bookedModel = mongoose.model('booked',schema);
module.exports=bookedModel;