const rateModel = require('../model/rate');

const create = async (body)=>{
    try{
        const findRate = await rateModel.findOne({rateBy : body.rateBy , postID : body.postID});
        if(findRate){
            findRate.set(body);
            const newRate = await findRate.save();
            return newRate;
        }
        const rateClass = new rateModel(body);
        const rate = await rateClass.save();
        return rate;
    }catch(err){
        throw Error(err);
    }
};
const average = async (postID) =>{
    const ratePost = await rateModel.find({postID});
    if(ratePost.length > 0){
        const avgRate = ratePost.reduce((accumulator, currentValue) => accumulator.rate + currentValue.rate)/ratePost.length;
        return avgRate;
    }
    return 0;
}
const find = async = async ()=>{
    const arrRate = await rateModel.find().populate('postID');
    const result = arrRate.map( (rate)=>{
        return average(rate.postID._id);
    });
    await Promise.all(result);
    return result ;
}
module.exports= {create, average,find };