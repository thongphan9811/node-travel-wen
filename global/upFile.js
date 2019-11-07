const formidable = require('formidable');
const promise1 = function async(req) {
  return new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/images';
    const body = {};
    let image = [];
    let title = '';
    form.multiples = true;
    form.parse(req)
    form.on("fileBegin", function (err, file) {
      const path = file.path;
      const type = file.type;
      const newPath = path + '.' + type
    })
      .on('file', function (name, file) {
        image.push(file.path);
      })
      .on('field', function (name, field) {
        body[name] = field;
        console.log(body);
      })
      .on('error', function (err) {
        reject(err);
      })
      .on('end', function () {
        body[image] = image;
        resolve({ body})
      })
  })
}
module.exports = promise1;
// router.post('/', midleware.authTourGuide, async (req, res) => {
//   const { body, image } = await promise1(req)
// })