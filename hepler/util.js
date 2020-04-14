var Jimp = require('jimp');

const validateEmail = function(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const resize = (path,newpath,weith,high)=>{
    return new Promise((resolve,reject)=>{
        Jimp.read(path, (err, img) => {
            if (err) return reject(err);
            img
              .resize(weith, high) // resize
              .quality(60) // set JPEG quality
              .write(newpath); // save
          })
          return resolve(newpath);
    })
}
module.exports = {validateEmail,resize};