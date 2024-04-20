import React, { ChangeEvent, FC, FormEvent, MouseEvent, useEffect, useState } from "react"
import ImageComponent from "../components/ImageComponent";
import { api } from "../apiService";
import { FormValueProps, ImageProps, QuizProp, QuestionProps, FormValidationErrors, AnswerProps } from "../Types";

const validateString = (input: string, fieldName: string) => {
    if (!input) {
        return `${fieldName} is required.`;
    } else {
        return '';
    }
}

const Questions: FC = () => {
    const [formValues, setFormValues] = useState<FormValueProps>({
        title: '',
        questions: [{
            description: '',
            image: {
                contentType: '',
                data: {
                    data: [],
                    type: ''
                }
            },
            answers: [{
                text: '',
                isCorrect: false,
                images: {
                    contentType: '',
                    data: {
                        data: [],
                        type: ''
                    }
                }
            }]
        }]
    })
    const [quizzes, setQuizzes] = useState<QuizProp[]>([])
    const [questions, setQuestions] = useState<QuestionProps[]>([])
    const [validationErrors, setValidationErrors] = useState<FormValidationErrors>({})
    const [optionsError, setOptionsError] = useState<string>('')

    const handleInputChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues, [name]: value
        }))
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number | undefined) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    const imageData = {
                        contentType: file.type,
                        data: {
                            data: Array.from(new Uint8Array(e.target.result as ArrayBuffer)),
                            type: file.type
                        }
                    };
                    setFormValues((prevValues) => {
                        const updatedQuestions = [...prevValues.questions];
                        if (questionIndex !== undefined && questionIndex < updatedQuestions.length) {
                            if (answerIndex !== undefined && answerIndex < updatedQuestions[questionIndex].answers.length) {
                                updatedQuestions[questionIndex].answers[answerIndex].images = imageData;
                            } else {
                                updatedQuestions[questionIndex].image = imageData;
                            }
                        }
                        return { ...prevValues, questions: updatedQuestions };
                    });
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleQuestionChange = (description: string, image: ImageProps, answers: AnswerProps[], index: number) => {
        const updatedQuestion = {
            description,
            image,
            answers
        };
        setFormValues((prevValues) => {
            const currentQuestion = prevValues.questions || []
            const updatedQuestions = [...currentQuestion]

            if (index !== undefined && index < updatedQuestions.length) {
                updatedQuestions[index] = updatedQuestion;
            } else {
                updatedQuestions.push(updatedQuestion)
            }

            return {
                ...prevValues,
                questions: updatedQuestions
            }
        })
    }
    const handleAddQuestion = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const errors: FormValidationErrors = {}
        const questionErrors: { description?: string; image?: string }[] = [];
        formValues.questions.forEach(question => {
            const descriptionError = validateString(question.description, 'Description');
            if (descriptionError) {
                questionErrors.push({ description: descriptionError });
            }
    
            if (question.image.data.data.length === 0) {
                questionErrors.push({ image: 'Please upload an image' });
            }
        });
    
        if(questionErrors.length > 0) {
            errors.questions = questionErrors
        }
        setValidationErrors(errors)
    
        if (questionErrors.length === 0) {      
            let hasError = false;
            formValues.questions.forEach(question => {
                if (question.answers.length < 2) {
                    hasError = true;
                }
            });
    
            if (hasError) {
                console.log('option error')
                setOptionsError('You must add more than one answer for each question');
                return;
            }
            setOptionsError('');
    
            const newQuestion: QuestionProps = {
                description: formValues.questions[0].description,
                image: formValues.questions[0].image,
                answers: formValues.questions[0].answers
            };
    
            setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    
            setFormValues(prevValues => ({
                ...prevValues,
                questions: [
                    ...prevValues.questions,
                    {
                        description: '',
                        image: {
                            contentType: '',
                            data: {
                                data: [],
                                type: ''
                            }
                        },
                        answers: [{
                            text: '',
                            isCorrect: false,
                            images: {
                                contentType: '',
                                data: {
                                    data: [],
                                    type: ''
                                }
                            }
                        }]
                    }
                ]
            }));

        }
    };    

    const removeQuestion = (index: number) => {
        setFormValues(prevState => ({
            ...prevState,
            questions: prevState.questions.filter((_, i) => i !== index)
        }));
    };

    const handleAnswerChange = (text: string, isCorrect: boolean, image: ImageProps, questionIndex: number, answerIndex: number) => {
        const updatedAnswer = {
            text,
            isCorrect,
            images: image,
        };
        setFormValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
            if (questionIndex !== undefined && questionIndex < updatedQuestions.length) {
                const updatedAnswers = [...updatedQuestions[questionIndex].answers];
                if (answerIndex !== undefined && answerIndex < updatedAnswers.length) {
                    updatedAnswers[answerIndex] = updatedAnswer;
                } else {
                    updatedAnswers.push(updatedAnswer);
                }
                updatedQuestions[questionIndex].answers = updatedAnswers;
            }
            return { ...prevValues, questions: updatedQuestions };
        });
    };

    const removeAnswer = (questionIndex: number, answerIndex: number) => {
        const updatedQuestions = [...formValues.questions];
        if (
            questionIndex !== undefined &&
            questionIndex < updatedQuestions.length &&
            answerIndex !== undefined &&
            answerIndex < updatedQuestions[questionIndex].answers.length
        ) {
            updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
            setFormValues({ ...formValues, questions: updatedQuestions });
        }
    };

    console.log(questions)

    const createQuiz = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: FormValidationErrors = {};
        const titleError = validateString(formValues.title, 'Title');

        if (titleError) {
            errors.title = titleError
        };

        setValidationErrors(errors)

        if (Object.keys(errors).length === 0) {
            try {
                console.log(formValues)
                const response = await api.post('/createQuestion', {title: formValues.title, questions: formValues.questions},
                    // {
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //     }
                    // }
                )
                console.log(response)
            } catch (error) {

            }
        }
    }
    console.log(validationErrors)

    useEffect(() => {
        const getAllQuiz = async () => {
            try {
                const response = await api.get('/getAllQuestions')
                if (response.status === 200) {
                    console.log(response)
                    setQuizzes(response.data.quiz)
                }
            } catch (error) {

            }
        }

        getAllQuiz()
    }, [])

    return (
        <>
            <div style={{ margin: '60px auto', width: '50%' }}>
                <div>
                    <div className="flex justify-center">
                        <h5 className="font-bold text-2xl">Set Questions</h5>
                    </div>
                    {optionsError && (
                        <div className="p-4 bg-red-300 border border-red-400 mt-2">
                            <p className="text-red-500">{optionsError}</p>
                        </div>
                    )}
                    <form onSubmit={createQuiz}>
                        <div style={formControl}>
                            <label htmlFor="title">
                                Quiz title
                            </label>
                            <input style={inputStyle} type="text" id="title" name="title" value={formValues.title} onChange={(e) => handleInputChange('title', e.target.value)} />
                        </div>
                        {validationErrors.title && (
                            <div className="p-2 bg-red-300 border border-red-400 mt-2 rounded-md">
                                <p className="text-red-500">{validationErrors.title}</p>
                            </div>
                        )}
                        <div style={formControl}>
                            <div className="flex justify-between">
                                <label htmlFor="questions">Questions</label>
                                <button onClick={handleAddQuestion} className="underline">Add</button>
                            </div>
                        </div>
                        {formValues.questions && formValues.questions.map((question, questionIndex) => (
                            <React.Fragment key={questionIndex}>
                                <div style={formControl}>
                                    <label>Question description</label>
                                    <br />
                                    <input value={question.description} style={inputStyle} type="text" onChange={(e) => handleQuestionChange(e.target.value, question.image, question.answers, questionIndex)} />
                                    <br />
                                </div>
                                {validationErrors.questions && (
                                    <div className="p-2 bg-red-300 border border-red-400 mt-2 rounded-md">
                                        {validationErrors.questions?.map((q) => (
                                            <p className="text-red-500">{q.description}</p>
                                        ))}
                                    </div>
                                )}
                                <div style={formControl}>
                                    <label>Image description</label>
                                    <br />
                                    <input style={inputStyle} type="file" onChange={(e) => handleFileChange(e, questionIndex, undefined)} />
                                </div>
                                {validationErrors.questions && (
                                    <div className="p-2 bg-red-300 border border-red-400 mt-2 rounded-md">
                                        {validationErrors.questions?.map((q) => (
                                            <p className="text-red-500">{q.image}</p>
                                        ))}
                                    </div>
                                )}
                                <br />
                                <div className="flex justify-between">
                                    <h5 className="text-l font-bold">Answers (Tick the box for the correct answer)</h5>
                                    <div>
                                        {question.answers.length < 5 && (
                                            <button className="underline" onClick={(e) => { e.preventDefault(); handleAnswerChange('', false, { contentType: '', data: { data: [], type: '' } }, questionIndex, question.answers.length) }}>Add</button>
                                        )}
                                    </div>
                                </div>
                                <br />
                                {question.answers && question.answers.map((option, answerIndex) => (
                                    <>
                                        <div className="flex justify-between">
                                            <label>Option {answerIndex + 1}</label>
                                            <button onClick={(e) => { e.preventDefault(); removeAnswer(questionIndex, answerIndex); }} className="underline">Remove</button>
                                        </div>
                                        <div style={formControl}>
                                            <input style={inputStyle} value={option.text} onChange={(e) => handleAnswerChange(e.target.value, option.isCorrect, option.images, questionIndex, answerIndex)} type="text" />
                                        </div>
                                        <div style={formControl}>
                                            <label>Image</label>
                                            <br />
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input onChange={(e) => handleFileChange(e, questionIndex, answerIndex)} style={inputStyle} multiple type="file" />
                                                <input style={{ width: '10%', height: '16px' }} type="checkbox" />
                                            </div>
                                            <br />
                                        </div>
                                    </>
                                ))}
                            </React.Fragment>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" style={buttonStyle}>Add</button>
                        </div>
                    </form>
                </div>
                <br />
                <div>
                    <div>
                        <h5 className="font-bold text-2xl">Questions</h5>
                    </div>
                    <br />
                    {questions.map((question, index) => (
                        <ul>
                                <div>
                                    <li>{question.description}</li>
                                    <button onClick={() => removeQuestion(index)} className="underline">Remove</button>
                                </div>
                                    <li key={index.toString()}>
                                        <ImageComponent index={index.toString()} imageData={question.image.data.data} contentType={question.image.contentType} />
                                    </li>
                                    {question.answers.map((item, answerIndex) => (
                                        <>
                                            <p>{item.text}</p>
                                            <li key={index.toString()}>
                                                <ImageComponent index={answerIndex.toString()} imageData={item.images.data.data} contentType={item.images.contentType} />
                                            </li>
                                        </>
                                    ))}
                        </ul>
                    ))}

                </div>
                <div>
                    <h5>Questions</h5>
                    {quizzes && quizzes.map((quiz) => (
                        <>
                            {Object.values(quiz.quizzes).map((item) => (
                                <>
                                    <p>{item.title}</p>
                                    {item.questions.map((ques, index) => (
                                        <>
                                        <p>{ques.description}</p>
                                            <ImageComponent index={index.toString()} imageData={ques.image.data.data} contentType={ques.image.contentType} />
                                            <div>
                                                <h5>Answers</h5>
                                                <div className="flex justify-between">
                                                    {ques.answers.map((ans, index) => (
                                                        <div>
                                                            <p>{ans.text}</p>
                                                            <ImageComponent index={index.toString()} imageData={ans.images.data.data} contentType={ans.images.contentType} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </>
                            ))}
                            {/* <ImageComponent /> */}
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

const formControl = {
    marginTop: '12px'
}

const inputStyle = {
    padding: '6px',
    width: '100%',
    borderRadius: '4px',
    border: '0.5px solid gray',
    marginTop: '6px',
    color: 'black',
}

const buttonStyle = {
    padding: '6px',
    marginTop: '12px',
    width: '50%',
    borderRadius: '4px',
    border: '0.5px solid gray',
    backgroundColor: 'darkblue',
    color: 'white'
}

export default Questions