const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationModel = require('./location');
const schema = new Schema({
    tourGuideID : {type: Schema.Types.ObjectId ,ref :'User'},
    localtionID :{type :Schema.Types.ObjectId ,ref: 'Location'},
    name :{type:String, unique:true,required:true},
    description:String,
    content: String,
    plan:String,
    price : Number,
    image :{type:Array},
    status:{type:String, default:'ACTIVE'},
    isDelete:{type:Boolean, default:false}
})

schema.pre('save',async function(next){
    try{
        if(this.isNew){
            const locationQuery = await LocationModel.findById(this.localtionID);
            if(!locationQuery) throw new Error('location ID khong ton tai');
            const namePostQuery = await PostModel.findOne({name:this.name});
            if(namePostQuery) throw new Error('tên bài viết đã tồn tại ');
            const PostTour = await PostModel.findOne({tourGuideID:this.tourGuideID , name :this.name })
            if(PostTour) throw new Error('bạn đã đăng bài viết này rồi ');
        }
        next();
    }catch(err){
        throw new Error(err.message);
    };
})
const PostModel = mongoose.model('Post',schema);
module.exports =PostModel;