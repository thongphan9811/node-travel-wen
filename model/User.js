const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../constants')
const bcrypt = require('bcrypt');
const schema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phone: Number,
    birthDay: Date,
    password: String,
    role: { type: String, default: constants.ROLE.CUSTOMER },
    isDelete: { type: Boolean, default: false }
});


schema.methods.comparePassword = async function (password) {
    try {
        let success = false;
        let _this = this;
        success = bcrypt.compareSync(password, _this.password)
        return success;
    } catch (err) {
        return
    }
}
schema.pre('save', async function (next) {
    try {
        let _this = this;
        if (_this.isModified('password')) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(_this.password, salt);
            this.password = hash;
            console.log(this.password);
        }
        if (this.isNew) {
            const usernameQuery = await UserModel.findOne({ username: _this.username });
            const emailQuery = await UserModel.findOne({ email: _this.email });
            console.log(usernameQuery);
            if (usernameQuery) {console.log("hahahha"); throw new Error('username da ton tai');}
            if (emailQuery) {console.log("huhuhuhu"); throw new Error('email da ton tai');}
        }
        console.log(this.password);
        next();
    }catch (error) {
        throw new Error(error);
    }
})
const UserModel = mongoose.model('User', schema);


module.exports = UserModel;