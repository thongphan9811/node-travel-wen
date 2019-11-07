const UserModel = require('../model/User');
const {validateEmail} = require('../hepler/util');
const bcrypt = require('bcrypt');
const create = async function(data){
    try{
        const UserClass = new UserModel(data);
        const user= await UserClass.save();
        //if(err) console.log(err)
        return user;
    }catch(err){
        throw new Error(err);
    }
};
const update = async function(_id,data){
    try{
        const UserClass = await UserModel.findById(_id);
        if(!UserClass){
             throw 'khong tim thay User can update '; 
        };
        UserClass.set(data);
        const userUpdate = await UserClass.save();
        return UserClass;
    }catch(err){
        console.log(err);
        throw new Error(err.message);
    }
};
const AuthUser = async function(email,password){
    try{
        const checkemail = validateEmail(email);
        if(!checkemail) throw new Error("ban nhap sai form email");
        const user = await UserModel.findOne({email:email});
        if(!user) throw new Error(" user khong ton tai ");
        const checkPass = await bcrypt.compareSync(password, user.password);
        if(!checkPass) throw new Error ("ban da nhap sai password ");
        user.password = undefined;    
        return user;
    }catch(err){
        throw new Error(err.message);
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
const getAllUser = async function(){
    try{
        const allUSer = UserModel.find();
        return allUSer;
    }catch(err){
        throw new Error(err.message);
    }
}
module.exports = {create , update,getByID,getAllUser,AuthUser};
