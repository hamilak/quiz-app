const multer = require('multer');

const storage =  multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'src/images')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname + '_' + Date.now())
    }
})

const imageUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error(`Inavlid image type`))
        }
        callback(undefined, true)
    }
})

module.exports = imageUpload