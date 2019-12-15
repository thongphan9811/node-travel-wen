const postService = require('../secvice/post');
const upfile = require('../global/upFile');
const userService = require('../secvice/user');
const locationService = require('../secvice/location');
const createError = require('http-errors');
const create = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        const {body} = await upfile(req);
        if(req.user.role == 'tourguide'){ body['tourGuideID'] = req.user._id;}
        console.log(body)
        const err = await validatePost(body);
        if (err) {
            throw err;
        };
        const posttt = await postService.create(body);
        console.log(posttt);
        if(req.user.role == 'admin'){return res.redirect('/adminPost');}
        if(req.user.role == 'tourguide'){return res.redirect('/adminPost/myPost'); }
        
    } catch (err) {
        console.log(err,"lalalala");
        return res.json({code:400 , mess :'dang bai viet that bai', data :err});
    }
};
const update = async (req,res) =>{
    try{
        
        const {body,err} = await upfile(req);
       
        const postQuery = await postService.update(req.user,body._id,body);
        console.log(postQuery)
        if( req.user.role == 'admin'){return res.redirect('/adminPost');};
        if( req.user.role == 'tourguide'){ return res.redirect('/adminPost/myPost')}
    }catch(err){
        return res.status(500).json(createError(500,err));
    };
};
const getAllPost = async (req,res)=>{
    try{
        const AllPost = await postService.getAllPost();
        const AllTourguide = await userService.getAllTourguide();
        const allLocation = await locationService.getAllLocation();
        console.log(AllPost);
        return res.render('adminhome',
        {url : WEB_URL,post :AllPost ,view :'admin/tablePost',author: req.user,tourGuide: AllTourguide,location : allLocation});
    }catch(err){
        console.log(err);
        return res.json({ code: 400, mess: " co loi khi lay tat ca Post", data: err });
    }
}
const getdettail = async (req,res)=>{
    try{
        const postID = req.params._postID;
        const post = await postService.getByID(postID);
        console.log(post);
        
        res.render('index',{user:req.user  ,url : WEB_URL ,view:'menu/room-single' ,post ,user:req.user});
    }catch(err){
        return res.json({ code :400 ,mess :"co loi khi get detail post" ,data :err});
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
const getMyPost = async (req,res)=>{
    try{
        const myPost = await postService.getPostByIdTG(req.user._id);
        const location =  await locationService.getAllLocation();
        console.log(myPost);
        return res.render('index',{user:req.user ,url : WEB_URL ,view:'menu/management-yourPost' ,post :myPost,location });                                                                                      
    }catch(err){
        return res.json({code: 500 ,mess :"co loi khi quan ly bai viet ca nhan", data :err});
    }
}
module.exports={create,update,getAllPost,getdettail,getMyPost};