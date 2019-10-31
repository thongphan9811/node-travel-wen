const express = require('express');
const router = express.Router();
const userModel = require('../../model/unvaliableDay');
const unvaliableDayModel = require('../../model/unvaliableDay');
const midleware = require('../../midleware/Auth');

router.put('/', midleware.authTourGuide, async (req, res) => {
    try {
        const startBusy = req.body.startBusy.split('-');
        const start = new Date(startBusy[0], startBusy[1] - 1, startBusy[2]);
        const endBusy = req.body.endBusy.split('-');
        const end = new Date(endBusy[0], endBusy[1] - 1, endBusy[2]);
        const updateUnvali = await unvaliableDayModel.updateOne({ createBy: req.user._id }, { startBusy: start, endBusy: end });
        return res.json({code :200 , mess:"cap nhat ngay ban thanh cong" ,data :updateUnvali});
    } catch(err){
        console.log(err);
        return res.json({code :400 ,mess :" cap nhat ngay ban that bai", data:err});
    }
})