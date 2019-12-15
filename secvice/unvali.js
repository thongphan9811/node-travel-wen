const invalidateModel = require('../model/unvaliableDay');

const getById = async (_id)=>{
    try{
        const invalidate = await invalidateModel.findOne({createBy :_id});
        return invalidate;
    }catch(err){
        throw new Error(err);
    }
};
module.exports = {getById};
