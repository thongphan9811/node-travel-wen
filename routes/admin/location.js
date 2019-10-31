var express = require('express');
var router = express.Router();
const midleware = require('../../midleware/Auth');
const locationModel = require('../../model/location');
//add location
router.post('/', midleware.authAdmin, async (req, res) => {
    try {
        const { nameLocation, description } = req.body;
        if (!nameLocation) throw 'ban can nhap ten location';
        const checkLocatinName = await locationModel.findOne({ nameLocation });
        if (checkLocatinName) throw "location da ton tai";
        const locationClass = new locationModel({ nameLocation, description });
        const locationSave = await locationClass.save();
        return res.json({
            code: 200,
            mess: 'them moi thanh cong',
            data: locationSave
        });
    } catch (err) {
        console.log(err)
        return res.json({
            code:400, mess:"them location khong thanh cong ", data: err
        })
    }
})
router.put('/', midleware.authAdmin, async (req, res) => {
    try {
        const { nameLocation, description, _id } = req.body;
        if (!nameLocation) throw 'ban can nhap ten location';
        const checklocation = await locationModel.findOne({ nameLocation });
        if (!checklocation) throw "location khong ton tai";
        const upLocation = await locationModel.updateOne({ _id: checklocation._id, nameLocation }, { nameLocation, description });
        return res.json({
            code: 200,
            mess: "sua location thanh cong",
            data :upLocation
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 400,
            mess: "update location khong thanh cong",
            data :err
        })
    }
});
router.delete('/', midleware.authAdmin, async (req, res) => {
    try {
        const nameLocation = req.body.nameLocation;
        const _id = req.body._id;  ///luu ys
        if (_id) checkIdLocation = await locationModel.findById(_id);//
        if (!nameLocation) throw 'ban can nhap ten location';
        const checklocation = await locationModel.findOne({ nameLocation });
        if (!checklocation) throw "location khong ton tai";
        const DeleteLocation = await locationModel.updateOne({ _id: checklocation._id, nameLocation }, { isDelete: true });
        return res.json({
            code: 200,
            mess: "ban da cap nhat thanh cong",
            data: DeleteLocation
        })
    } catch (err) {
        return res.json({
            code: 400,
            mess: err
        })
    }
})
module.exports =router;