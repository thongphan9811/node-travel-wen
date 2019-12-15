const formidable = require('formidable');
const promise1 = function async(req) {
  return new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/images';
    const body = {};
    let images = [];
    let title = '';
    form.multiples = true;
    form.parse(req)
    form.on("fileBegin", function (err, file) {
      file.path = file.path+'.jpg' ;
    })
      .on('file', function (name, file) {
        images.push(file.path.slice(6));
      })
      .on('field', function (name, field) {
        console.log(body);
        body[name] = field;
      })
      .on('error', function (err) {
        console.log(err);
        reject(err);
      })
      .on('end', function () {
        body['image'] = images;
        console.log(body.image);
        resolve({ body})
      })
  })
}
module.exports = promise1;
// router.post('/', midleware.authTourGuide, async (req, res) => {
//   const { body, image } = await promise1(req)
// })