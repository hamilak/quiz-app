const QuestionModel = require('../model/questions')
const fs = require('fs')

exports.createQuestion = async(req, res) => {
    try {
        const { title, questions } = req.body
        console.log(req.body)
        for (const question of questions) {
            // if (question.image) {
            //     // const questionImageBuffer = fs.readFileSync(question.image.path);
            //     const questionImageData = {
            //         data: question.image.data.data,
            //         contentType: question.image.mimetype
            //     };
            //     console.log("question image:", questionImageData)
            //     mainImageBuffer = questionImageData.data;
            // }


            for (const answer of question.answers) {
                if (answer.image) {
                    // const answerImageBuffer = fs.readFileSync(answer.image.path);
                    const answerImageData = {
                        data: answer.image.data.data,
                        contentType: answer.image.contentType
                    };
                    answerImages.push(answerImageData);
                }
            }
        }

        const question = await QuestionModel.create({
            quizzes: [{
                title: title,
                questions: questions.map(question => ({
                    description: question.description,
                    image: {
                        data: question.image.data.data,
                        contentType: question.image.contentType
                    },
                    answers: question.answers.map((ans, index) => ({
                        text: ans.text,
                        isCorrect: ans.isCorrect,
                        images: {
                            data: ans.images.data.data,
                            contentType: ans.images.contentType
                        }
                    }))
                }))
            }]
        })

        console.log(question)

        // res.status(201).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllQuestions = async(req, res) => {
    try {
        const quiz = await QuestionModel.find({})
        console.log('quizzes:', quiz.length)
        if(quiz.length === 0) {
            return res.status(400).send({ message: 'No quiz available' })
        }
        res.send({ message: 'Questions', quiz })
    } catch (error) {
        res.status(500).send({ message: 'Error: ', error })
    }
}

exports.getOneQuestion = async(req, res) => {
    try {
        const quizId = req.params.quizId
        console.log('quizId')
    } catch (error) {
        res.status(500).send({ message: 'Error: ', error })
    }
}

exports.updateQuestion = async(req, res) => {}

exports.deleteQuestion = async(req, res) => {}