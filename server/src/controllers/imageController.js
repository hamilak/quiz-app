const ImageModel = require('../model/images')
const fs = require('fs')

exports.uploadImage = async(req, res) => {
    console.log(req.file)
}

exports.uploadMultipleImages = async(req, res) => {
    console.log(req.files)
    try {
        if(!req.files || req.files.length === 0) {
            res.status(400).send({ message: 'No files uploaded' })
        }

        const images = []
        for(const file of req.files) {
            const buffer = fs.readFileSync(file.path);
            images.push({
                data: buffer,
                contentType: file.mimetype
            })
        }

        console.log("Images: ", images)
        const savedImages = await ImageModel.create(images)
        console.log(savedImages)

        for (const file of req.files) {
            fs.unlinkSync(file.path)
        }
        res.status(201).send(savedImages)
    } catch (error) {
        console.log("Error upload multiple: ", error)
    }
}

exports.getAllImages = async(req, res) => {
    try {
        const images = await ImageModel.find({});
        res.status(200).send(images);
    } catch (error) {
        res.send(error)
    }
}

exports.deleteImage = async(req, res) => {
    try {
        const image = await ImageModel.findById(req.params.id)
        if(!image) {
            res.status(404).send({ message: 'No image found' })
        }
        const deletedImage = await ImageModel.deleteOne(image)
        res.send({ message: 'Image deleted', deletedImage })
    } catch (error) {
        
    }
}