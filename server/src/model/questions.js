const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        quizzes: [
            {
                title: {
                    type: String,
                    required: true
                },
                questions: [
                    {
                        description: {
                            type: String,
                            required: true
                        },
                        image: {
                            data: Buffer,
                            contentType: String
                        },
                        answers: [
                            {
                                text: {
                                    type: String,
                                    required: true
                                },
                                isCorrect: {
                                    type: Boolean,
                                    required: true,
                                    default: false
                                },
                                images: {
                                    data: Buffer,
                                    contentType: String
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });

const QuestionModel = mongoose.model('Questions', QuestionSchema)

module.exports = QuestionModel