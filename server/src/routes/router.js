const express = require('express');
const route = express.Router();
const imageUpload = require('../config/multer.config')
const imageController = require('../controllers/imageController')
const questionController = require('../controllers/questionsController')

// image upload

route.post('/uploadImage', imageUpload.single('image'), imageController.uploadImage)

route.post('/uploadMultiple', imageUpload.array('image', 5), imageController.uploadMultipleImages)

route.get('/images', imageController.getAllImages)

route.delete('/deleteImage/:id', imageController.deleteImage)

// questions routes

route.post('/createQuestion', imageUpload.array('image', 6), questionController.createQuestion)

route.get('/getAllQuestions', questionController.getAllQuestions)

route.get('/getOneQuestion/:quizId', questionController.getOneQuestion)

route.put('/updateQuestion', questionController.updateQuestion)

route.delete('/deleteQuestion', questionController.deleteQuestion)


module.exports = route