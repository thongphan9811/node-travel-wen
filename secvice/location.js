const locationModel = require('../model/location');

const created = async function (data) {
    try {
        const locationClass = new locationModel(data);
        const location = await locationClass.save();
        return locationClass;
    }catch(err){
        console.log(err);
     throw new Error(err);
    }
};
const update = async function(_id,body){
    try{
        
        const data = {};
        const locationUP = await locationModel.findById(_id);
        if(!locationUP) throw new Error ("khong tim thay location can update");
        for(const key in body){
            if(body[key]){
                data[key] = body[key];
            }
        }
        console.log(data);
        locationUP.set(data);

        const locationUpdated = await locationUP.save();
        return locationUpdated;
    }catch(err){
        console.log(err);
        throw new Error(err.message);
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
        const allLocation = await locationModel.find({isDelete:false});
        return allLocation;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
};
module.exports = {created,update,getByIdLocation,getAllLocation};