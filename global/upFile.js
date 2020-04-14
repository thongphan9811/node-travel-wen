const formidable = require('formidable');
const hepler = require('../hepler/util');
const fs = require('fs');

const promise1 = function async(req) {
  return new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/images';
    const body = {};
    let images = [];
    let thumb_img = [];
    let removeFile = [];
    form.multiples = true;
    form.parse(req)
    form
      .on('file', async function (name, file) {
        if(file && file.type == 'application/octet-stream'){
          removeFile.push(file.path);
        }
        if (file && file.type != 'application/octet-stream') {
        let newpath = file.path.split('.');
        let newpath_thumb = newpath[0]+'_thumb'+'.'+'jpg';
        let newPath_main_img = newpath[0]+'_main'+'.'+'jpg';
        thumb_img.push(newpath_thumb.slice(6));
        images.push(newPath_main_img.slice(6));
        const path_IMG = await hepler.resize(file.path,newpath_thumb,400,400);
        const resize_main_img = await hepler.resize(file.path,newPath_main_img,800,800);
        }
      })
      .on('field', function (name, field) {
        body[name] = field;
      })
      .on('error', function (err) {
        reject(err);
      })
      .on('end', function () {
        if (removeFile && removeFile.length > 0){
          for (let i = 0; i < removeFile.length; i++){
            fs.unlinkSync(removeFile[i]);
          }
        }
        body['image'] = images;
        body['thumb_img']= thumb_img;
        resolve({ body})
      })
  })
}
module.exports = promise1;