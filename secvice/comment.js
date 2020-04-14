const commentModel = require('../model/comment');

const create = async(body)=>{
    try{
        const commentClass = new commentModel(body);
        const comment = await commentClass.save();
        return comment;
    }catch(err){
        throw Error(err);
    }
}

module.exports = { create};