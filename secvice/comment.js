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
const getAllCommentPost = async(postID)=>{
    try{
        const arrComment = await commentModel.find({postID}).populate('commentBy');
        return arrComment;
    }catch(err){
        throw Error(err);
    }
}
module.exports = { create,getAllCommentPost};