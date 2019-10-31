const express = require('express');
const router = express.Router();
const locationModel = require('../../model/location');
const postModel = require('../../model/post');
const midleware = require('../../midleware/Auth');
const formidable = require('formidable');
router.post('/', midleware.authTourGuide, async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.uploadDir = './public/images';
        const body = {};
        let image = [];
        let title = '';
        form.multiples = true;
        form.parse(req)
        form.on("fileBegin", function (err, file) {
            file.path = file.path + ".jpg";
        })
            .on('file', function (name, file) {
                image.push(file.path);
            })
            .on('field', function (name, field) {
                body[name]=field;
                console.log(body);
            })
            .on('error', function (err) {
                throw err;
            })
            .on('end', async function () {
                const checkLocation = await locationModel.findOne({nameLocation:body.nameLocation});
                if(!checkLocation) throw "location khong ton tai";
                const checkPost = await postModel.findOne({name:body.name});
                if(checkPost) throw " ban da dang bai voi name nay roi";
                const postClass = new postModel({tourGuideID:req.user._id,localtionID:checkLocation._id,name:body.name,description:body.description,conten:body.conten,plan:body.plan,
                    price:parseInt(body.price),image,status:body.status});
                const savePost = await postClass.save();
                return res.json({code : 200, mess:"tao bai post thanh cong", data :savePost});
            })

    } catch (err) {
        console.log(err);
        return res.json({
            code: 400,
            mess: "tao bai tour khong thanh cong",
            data: err
        });
    }
});
router.put('/', midleware.authAdminTourGuide, async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.uploadDir = './public/images';
        const body = {};
        let image = [];
        let title = '';
        form.multiples = true;
        form.parse(req)
        form.on("fileBegin", function (err, file) {
            file.path = file.path + ".jpg";
        })
            .on('file', function (name, file) {
                image.push(file.path);
            })
            .on('field', function (name, field) {
                body[name]=field;
                console.log(body);
            })
            .on('error', function (err) {
                throw err;
            })
            .on('end', async function () {
                const checkLocation = await locationModel.findOne({nameLocation:body.nameLocation});
                if(!checkLocation) throw "location khong ton tai";
                const checkPost = await postModel.findOne({name:body.name});
                if(!checkPost) throw " bạn chưa đăng bài viết nào với name này";
                if(req.user._id == "admin"){
                    const updateAdmin = await postModel.findOneAndUpdate({name:body.name},{localtionID:checkLocation._id,name:body.name,description:body.description,conten:body.conten,plan:body.plan,
                        price:parseInt(body.price),image,status:body.status,isDelete});
                    return res.json({code :200 ,mess :"admin update thanh cong bai post",data :updateAdmin});
                }
                if(req.user._id == "tourguide"){
                    const updateTourguide = await postModel.findOneAndUpdate({name:body.name,tourGuideID:req.user._id},{localtionID:checkLocation._id,name:body.name,description:body.description,conten:body.conten,plan:body.plan,
                        price:parseInt(body.price),image,status:body.status});
                    return res.json({code :200 ,mess :"update thanh cong bai viet cua ban",data :updateTourguide});
                }
            });

    } catch (err) {
        console.log(err);
        return res.json({
            code: 400,
            mess: "tao bai tour khong thanh cong",
            data: err
        });
    }
});
router.delete('/', midleware.authTourGuide, async (req, res) => {
    try {
        const { name, nameLocation } = req.body;
        const checkLocatin = await locationModel.findOne({ nameLocation: nameLocation });
        if (!checkLocatin) throw 'locaton khong ton tai';
        const checkpostName = await postModel.findOne({ name });
        if (!checkpostName) throw 'ban chua dang bai nay hoac sai ten bai dang';
        const DeletePost = await postModel.updateOne({ _id: checkLocatin._id, name, tourGuideID: req.user._id }, { isDelete: true });
        return res.json({ code: 200, mess: 'delete thanh cong bai post', data: DeletePost });
    } catch (err) {
        return res.json({ code: 400, mess: 'delete bai post that bai', data: err });
    }
})
module.exports = router;