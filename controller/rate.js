const createError = require('http-errors');
const rateService = require('../secvice/rate');
var _ = require('lodash');
const create = async (req,res)=>{
    try{
        const body = req.body;
        const err =  validateBody(body);
        if(err) throw err;
        body['rateBy'] = req.user._id;
        const rate = await rateService.create(body);
        return res.json({code:200,mess:'bình luận thành công' ,data:rate});
    }catch(err){
        const message = _.isString(err) ? err : err.message;
        return res.status(400).json(createError.BadRequest(message));
    }
}
const validateBody = (body)=>{
    let err =null
    if(!body.postID) return err = 'không có postID';
    if(!body.rate) return err = 'mời nhập số sao rate';
    return err
}
module.exports = {create};