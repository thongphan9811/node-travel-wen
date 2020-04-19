const UserModel = require('../model/User');
const {validateEmail} = require('../hepler/util');
const bcrypt = require('bcrypt');
const create = async function(data){
    try{
        const UserClass = new UserModel(data);
        const user= await UserClass.save();
        return user;
    }catch(err){
        throw new Error(err);
    }
};
const update = async function(_id,body){
    try{
        const data ={};
        const UserClass = await UserModel.findById(_id);
        if(!UserClass){
             throw 'khong tim thay User can update '; 
        };
        for(const key in body){
            if(body[key]){
                data[key] =body[key];
            }
        }
        const userUpdate = await UserModel.updateOne({_id:UserClass._id},data);
        const newUpdate = await UserModel.findOne({_id})
        return newUpdate;
    }catch(err){
        console.log(err);
        throw new Error(err.message);
    }
};
const AuthUser = async function(email,password){
    try{
        const checkemail = validateEmail(email);
        if(!checkemail) throw "ban nhap sai form email";
        console.log(email.toString());
        const user = await UserModel.findOne({email:email.toString()});
        if(!user) throw " user khong ton tai ";
        const checkPass = await bcrypt.compareSync(password, user.password);
        if(!checkPass) throw "ban da nhap sai password ";
        user.password = undefined;    
        return user;
    }catch(err){
        throw err;
    }
}
const getByID = async function(_id){
    try{
        const userID = await UserModel.findById(_id);
        return userID;
    }catch(err){
        throw new Error(err.message);
    }
};
const getAllTourguide  = async function(){
    try{
        const allTourguide = await UserModel.find({role :'tourguide',isDelete :false});
        return allTourguide;
    }catch(err){
        throw new Error(err.message);
    }
}
const getAllUser = async function(){
    try{
        const allUSer = UserModel.find({isDelete :false});
        return allUSer;
    }catch(err){
        throw new Error(err.message);
    }
}
module.exports = {create ,update,getByID,getAllUser,AuthUser,getAllTourguide};
