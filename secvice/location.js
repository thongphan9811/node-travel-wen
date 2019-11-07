const locationModel = require('../model/location');

const create = async function (data) {
    try {
        const locationClass = new locationModel(data);
        const location = await locationClass.save();
        return locationClass;
    }catch(err){
        console.log(err);
        return err;
    }
};
const update = async function(_id,data){
    try{
        const locationUP = await locationModel.findById(_id);
        if(!locationUP) throw "khong tim thay location can update";
        locationUP.set(data);
        const locationUpdated = await locationUP.save();
        return locationUpdated;
    }catch(err){
        return err;
    }
};
const getByIdLocation = async function(_id){
   try{
       const location = await locationModel.findById(_id);
       return location;
   }catch(err){
       return err;
   }
};
const getAllLocation = async function(){
    try{
        const allLocation = locationModel.find();
        return allLocation;

    }catch(err){
        throw new Error(err.message);
    }
};
module.exports = {create,update,getByIdLocation,getAllLocation};