const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        answer: [
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
                image: {
                    data: Buffer,
                    contentType: String
                }
            }
        ]
    }
);

const QuestionModel = mongoose.model('Questions', QuestionSchema)

module.exports = QuestionModel