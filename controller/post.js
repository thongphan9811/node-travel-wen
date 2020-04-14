const postService = require('../secvice/post');
const upfile = require('../global/upFile');
const userService = require('../secvice/user');
const locationService = require('../secvice/location');
const createError = require('http-errors');
var _ = require('lodash');
const create = async (req, res) => {
    try {
        const {body} = await upfile(req);
        console.log(body,"bodyyyyyy");
        if(req.user.role == 'tourguide'){ body['tourGuideID'] = req.user._id;}
        const err = await validatePost(body);
        if (err) {
            throw err;
        };
        const post = await postService.create(body);
        if(req.user.role == 'admin'){return res.redirect('/adminPost');}
        if(req.user.role == 'tourguide'){return res.json({post}) }
        
    } catch (err) {
        const message = _.isString(err) ? err : err.message;
        return res.status(400).json(createError.BadRequest(message));
    }
};
const update = async (req,res) =>{
    try{       
        let {body,err} = await upfile(req);
        if(body['image'].length === 0){
            body =  _.omit(body,['image','thumb_img'])
        }
        const postQuery = await postService.update(req.user,body._id,body);
        if( req.user.role == 'admin'){return res.redirect('/adminPost');};
        if( req.user.role == 'tourguide'){ 
            // return res.redirect('/adminPost/myPost')}
            return res.json({postQuery});}
    }catch(err){
        const message = _.isString(err) ? err : err.message;
        return res.status(400).json(createError.BadRequest(message));
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
    if (!body.plan) err = 'ban can nhap lich trinh cho bai viet (plan)';
    if (!body.price) err = 'ban can nhap gia cho chuyen di (price)';
    if (!body.image[0]) err = 'bai dang khong co hinh anh nao';
    return err;
};
const getMyPost = async (req,res)=>{
    try{
        const myPost = await postService.getPostByIdTG(req.user._id);
        const location =  await locationService.getAllLocation();
        return res.render('index',{user:req.user ,url : WEB_URL ,view:'menu/management-yourPost' ,post :myPost,location });                                                                                      
    }catch(err){
        return res.json({code: 500 ,mess :"co loi khi quan ly bai viet ca nhan", data :err});
    }
}
const getPageCreate = async (req,res) =>{
    try{
        const location =  await locationService.getAllLocation();
        return res.render('index',{url : WEB_URL,user:req.user,view:'menu/create-post',location})
    }catch(err){
        return res.json({code: 500 ,mess :"co loi khi quan ly bai viet ca nhan", data :err});
    }
}
const getPageUpdate = async (req,res) =>{
    try{
        const _id = req.params._id;
        const post = await postService.getByID(_id);
        const location =  await locationService.getAllLocation();
        return res.render('index',{url : WEB_URL,user:req.user,view:'menu/update-post',location, post});
    }catch(err){

    }
}
module.exports={create,update,getAllPost,getdettail,getMyPost,getPageCreate,getPageUpdate};