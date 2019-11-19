const postModel = require('../model/post');
const create = async function (body) {
    try {
        const postClass = new postModel(body);
        const post = await postClass.save();
        console.log(post,"+++++++++++++++++++++++++++");
        return post;
    } catch (err) {
        throw new Error(err.message);
    };
};
const update = async function (user,_id, body) {
    try {
        const postQuery = await postModel.findById(_id);
        if (!postQuery) throw new Error('khong co bai viet can update');
        const authorPost = await postModel.findOne({tourGuideID:user._id,_id:postQuery._id});
        if(!authorPost) throw new Error('ban khong co quyen sua doi bai viet nay');
        if(!user.role != 'admin') throw new Error('ban khong co quyen sua bai viet nay');
        postQuery.set(body);
        const postUpdate = await postQuery.save();
        return postUpdate;
    } catch (err) {
        throw new Error(err.message);
    }
};
const delet = async (_id,body) => {
    try {
        const postQuery = await postModel.findById(_id);
        if (!postQuery) throw new Error('khong co bai viet can delete');
        postQuery.set(body);
        const postDelete = await postQuery.save();
        return postDelete;
    } catch(err){
        throw new Error(err.message);
    }
};
const getByID = async (_id) =>{
    try{
        const postID = await postModel.findById(_id);
        if (!postID) throw new Error ('khong co bai post voi Id can tim ');
        return postID;
    }catch(err){
        throw new Error(err.message);
    }
};

const getAllPost = async ()=>{
    try{
        const arrPost = await postModel.find();
        return arrPost;
    }catch(err){
        throw new Error(err);
    }
};
module.exports= {create,update,delet,getByID,getAllPost};