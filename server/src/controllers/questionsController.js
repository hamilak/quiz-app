const QuestionModel = require('../model/questions')
const fs = require('fs')

exports.createQuestion = async(req, res) => {
    try {
        const { title, questions } = req.body
        for (const question of questions) {
            console.log("question image:", question.image)
            if (question.image) {
                const questionImageBuffer = fs.readFileSync(question.image.path);
                const questionImageData = {
                    data: questionImageBuffer,
                    contentType: question.image.mimetype
                };
                mainImageBuffer = questionImageData.data;
            }

            for (const answer of question.answers) {
                if (answer.image) {
                    const answerImageBuffer = fs.readFileSync(answer.image.path);
                    const answerImageData = {
                        data: answerImageBuffer,
                        contentType: answer.image.mimetype
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
                        data: mainImageBuffer,
                        contentType: mainImage.mimetype
                    },
                    answers: question.answers.map((ans, index) => ({
                        text: ans.text,
                        isCorrect: ans.isCorrect,
                        image: ans.image ? answerImages[index] : null
                    }))
                }))
            }]
        })

        // res.status(201).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllQuestions = async(req, res) => {}

exports.getOneQuestion = async(req, res) => {}

exports.updateQuestion = async(req, res) => {}

exports.deleteQuestion = async(req, res) => {}