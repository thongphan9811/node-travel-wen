const postModel = require('../model/post');
const create = async function (body) {
    try {
        const postClass = new postModel(body);
        const post = await postClass.save();
        return post;
    } catch (err) {
        throw new Error(err.message);
    };
};
const updateMany = async (_id, body) => {
    try {
        const updatepost = await postModel.updateMany({ tourGuideID: _id }, body);
        return updatepost;
    } catch (err) {
        throw new Error(err);
    }
}
const update = async function (user, _id, body) {
    try {
        const postQuery = await postModel.findById({ _id });
        if (!postQuery) throw new Error('khong co bai viet can update');
        if (body.image.length == 0) {
            body.image.length = null;
            console.log(body.image.length);
        }
        if (user.role == 'customer') {
            throw new Error('ban khong co quyen sua bai viet nay admin')
        } else {
            if (user.role == 'admin') {
                const postUpdate = await postModel.updateOne({ _id }, body);
                return postUpdate;
            }
            const authorPost = await postModel.findOne({ tourGuideID: user._id, _id: postQuery._id });
            if (authorPost) {
                const postUpdate = await postModel.updateOne({ _id, tourGuideID: user._id }, body);
                return postUpdate;
            }
            if (!authorPost) throw 'ban khong co quyen sua doi bai viet nay'
        }
    } catch (err) {
        throw err;
    }
};
const delet = async (_id) => {
    try {
        const postQuery = await postModel.find({ localtionID: _id });
        console.log(postQuery);
        if (!postQuery) throw new Error('khong co bai viet can delete');
        const postDelete = await postModel.updateMany({ localtionID: _id }, { isDelete: true });
        return postDelete;
    } catch (err) {
        throw new Error(err.message);
    }
};
const getByID = async (_id) => {
    try {
        const postID = await postModel.findById(_id).populate('tourGuideID').populate('localtionID');
        if (!postID) throw new Error('khong co bai post voi Id can tim ');
        return postID;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllPost = async () => {
    try {
        const arrPost = await postModel.find({ isDelete: false }).populate('tourGuideID').populate('localtionID');
        return arrPost;
    } catch (err) {
        throw new Error(err);
    }
};
const getPostByIdTG = async (_id) => {
    try {
        const post = await postModel.find({ tourGuideID: _id }).populate('localtionID');
        return post;
    } catch (err) {
        throw err;
    }
}
module.exports = { create, update, delet, getByID, getAllPost, updateMany, getPostByIdTG };