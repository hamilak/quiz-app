const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema(
    {
        data: Buffer,
        contentType: String
    }
)

const ImageModel = mongoose.model('Images', ImageSchema)

module.exports = ImageModel