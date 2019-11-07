const locationService = require('../secvice/location');

const create = async function (req, res) {
    try {
        const body = req.body;
        const err = unvalidateLocation(body);
        body[createBy] = req.user._id;
        if (err) {
            throw err.message;
        }
        const location = await locationService.create(body);
        return res.json({ code: 200, mess: "them location thanh cong", data: location });
    } catch (err) {
        return res.json({ code: 400, mess: "them location that bai", data: err });
    }
}
const update = async function (req, res) {
    try {
        const body = req.body;
        const upLocation = await locationService.update(body);
        return res.json({ code: 200, mess: "update location thanh cong", data: upLocation });
    } catch (err) {
        return res.json({ code: 400, mess: "them location that bai", data: err.message });
    }
};
const delet = async (req, res) => {
    try {
        const body = { isDelete: true };
        const delLocation = await locationService.update(body);
        return res.json({ code: 200, mess: "delete location thanh cong", data: delLocation });
    } catch (err) {
        return res.json({ code: 400, mess: "them location that bai", data: err.message });
    }
}
const getAll = async (req, res) => {
    try {
        const AllLocation = await locationService.getAllLocation();
        return res.json({ code: 200, mess: "tat ca cac location", data: AllLocation });
    } catch (err) {
        return res.json({ code: 400, mess: " co loi khi lay tat ca location", data: err.message });
    }
}
const getByID = async (req, res) => {
    try{
        const _id = req._id;
        const locationDetail = await locationService.getByIdLocation(_id);
        return res.json({ code: 200, mess: "get location thanh cong", data: locationDetail });
    }catch(err){
        return res.json({ code: 400, mess: " co loi khi lay location", data: err.message });
    }
}
const unvalidateLocation = async function (body) {
    let err = null;
    if (!body.nameLocation) err = 'ban can nhap name location';
    if (!body.description) err = 'ban can nhap description';
    return err;
}
module.exports= {create,update,delet,getAll,getByID};