const commentService = require('../secvice/comment');
const postService = require('../secvice/post');
var createError = require('http-errors');
var _ = require('lodash');
const create =async (req,res,next)=>{
    try{
        const body = req.body;
        body['commentBy']= req.user._id;
        body['createAt']= new Date();
        const err =  validate(body);
        if(err){
            throw Error(err);;
        }
        const post = await postService.getByID(body.postID);
        if(!post) throw Error('POST NOT FOUND');
        const comment = await commentService.create(body);
        return res.json({code:200,mess:'bình luận thành công' ,data:comment});
    }catch(err){
        const message = _.isString(err) ? err : err.message;
        return res.status(400).json(createError.BadRequest(message));
    }
}
const validate = (body)=>{
    err = null;
    if(body.commentBy === '' || !body.commentBy) err = 'lỗi không tìm thấy người bình luận';
    if(body.postID === '' || !body.postID) err = 'không tim thấy postID';
    if(body.comment === ''|| !body.comment) err = 'bạn cần nhập bình luận';
    return err;
}
module.exports= {create};