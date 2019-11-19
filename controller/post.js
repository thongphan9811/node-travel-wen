const postService = require('../secvice/post');
const upfile = require('../global/upFile');
const userService = require('../secvice/user');
const locationService = require('../secvice/location');
const create = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        const {body} = await upfile(req);
        if(req.user.role == 'tourguide'){ body[tourGuideID] = req.user._id;}
        const err = await validatePost(body);
        if (err) {
            throw err;
        };
        const posttt = await postService.create(body);
        console.log(posttt);
        return res.redirect('/adminPost');
    } catch (err) {
        console.log(err);
        return res.json({code:400 , mess :'dang bai viet that bai', data :err});
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
const getAllPost = async (req,res)=>{
    try{
        const AllPost = await postService.getAllPost();
        const AllTourguide = await userService.getAllTourguide();
        const allLocation = await locationService.getAllLocation();
        return res.render('adminhome',
        {url : WEB_URL,post :AllPost ,view :'admin/tablePost',author: req.user,tourGuide: AllTourguide,location : allLocation});
    }catch(err){
        return res.json({ code: 400, mess: " co loi khi lay tat ca Post", data: err });
    }
}
const validatePost = async function (body) {
    let err = null;
    if (!body.localtionID) err = 'ban can truyen id location';
    if (!body.name) err = 'ban can nhap ten bai post';
    if (!body.content) err = 'ban can nhap tieu de cho bai viet (conten)';
    if (!body.plan) err = 'ban can nhap lich trinh cho bai viet (plan)';
    if (!body.price) err = 'ban can nhap gia cho chuyen di (price)';
    if (!body.image[0]) err = 'bai dang khong co hinh anh nao';
    return err;
};
module.exports={create,update,getAllPost};