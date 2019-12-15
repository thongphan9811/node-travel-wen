const locationService = require('../secvice/location');
const postServise = require('../secvice/post');
const create = async function (req, res) {
    try {
        const body = req.body;
        const err = await unvalidateLocation(body);
        body.createBy = req.user._id;
        if (err) {
            throw err;
        }
        const locationnn = await locationService.created(body)
        return res.redirect('/adminlocation');
    } catch (err) {
        console.log(err);
        return res.json({ code: 400, mess: "them location that bai", data: { err } });
    }
};
const update = async function (req, res) {
    try {
        
        const body = req.body;
        if (body.isDelete == true || body.isDelete == "true"){
            const dltPost = await postServise.delet(body._id);
            console.log(dltPost,'++++++++++++++++++');
        }
        const upLocation = await locationService.update(body._id, body);
        console.log(upLocation);
        return res.redirect('/adminlocation');
    } catch (err) {
        return res.json({ code: 400, mess: "them location that bai", data: err.message });
    }
};
const delet = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        const body = { isDelete: true };
        const delLocation = await locationService.update(body);
        return res.json({ code: 200, mess: "delete location thanh cong", data: delLocation });
    } catch (err) {
        return res.json({ code: 400, mess: "them location that bai", data: err.message });
    }
}
const getAll = async function(req, res) {
    try {    
        const AllLocation = await locationService.getAllLocation();
        console.log(AllLocation,req.user);
        console.log('hello');  
        return res.render('adminhome', { url: WEB_URL, location: AllLocation, view: 'admin/tableLocation', author: req.user })
    } catch (err) {
        console.log('+++++++++++++++++++++++++++++++');
        console.log(err);
        return res.json({ code: 400, mess: " co loi khi lay tat ca location", data: err });
    }
}
const getByID = async (req, res) => {
    try {
        const _id = req._id;
        const locationDetail = await locationService.getByIdLocation(_id);
        return res.json({ code: 200, mess: "get location thanh cong", data: locationDetail });
    } catch (err) {
        return res.json({ code: 400, mess: " co loi khi lay location", data: err.message });
    }
}
const unvalidateLocation = async function (body) {
    let err = null;
    //if(!body.createBy) err = 'khong tim thay nguoi tao location';
    if (!body.nameLocation) err = 'ban can nhap name location';
    if (!body.description) err = 'ban can nhap description';
    return err;
}
module.exports = { create, update, delet, getAll, getByID };
