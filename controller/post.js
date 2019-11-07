const postService = require('../secvice/post');
const upfile = require('../global/upFile');
const create = async (req, res) => {
    try {
        const body = await upfile(req);
        body[tourGuideID] = req.user._id;
        const err = validatePost(body);
        if (err) {
            throw err;
        };
        const post = await postService.create(body);
        return res.json({ code: 200, mess: 'dang bai thanh cong ', data: post });
    } catch (err) {
        return res.json({code:400 , mess :'dang bai viet that bai', data :err.message});
    }
};
const update = async (req,res) =>{
    try{
        const body = await upfile(req);
        const postQuery = await postService.update(req.user,postId,body);
        return res.json({code :200 ,mess : 'chinh sua bai post thanh cong',data :postQuery});
    }catch(err){
        return res.json({code :400 ,mess :'chinh sua bai post that bai ', data :err.message});
    };
};

const validatePost = function (body) {
    let err = null;
    if (!body.localtionID) err = 'ban can truyen id location';
    if (!body.name) err = 'ban can nhap ten bai post';
    if (!body.content) err = 'ban can nhap tieu de cho bai viet (conten)';
    if (!body.plan) err = 'ban can nhap lich trinh cho bai viet (plan)';
    if (!body.price) err = 'ban can nhap gia cho chuyen di (price)';
    if (!body.image) err = 'bai dang khong co hinh anh nao';
    return err;
}