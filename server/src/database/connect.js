const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1/quizz')
    .then(() => {
        console.log('Mongodb connection successful')
    })
    .catch((error) => {
        console.log(error);
        console.log('Failed to connect to mongodb')
    })

require('../model/images')