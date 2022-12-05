const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  const fileSize = parseInt(req.headers['content-length']);
    if(fileSize <= 5242880){
        cb(null, true);
    } else{
        cb(null, false);
    }
};

let upload = multer({ storage: storage, fileFilter: fileFilter,});

module.exports = upload.array('fileData');

