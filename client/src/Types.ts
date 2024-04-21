export interface ImageProps {
    contentType: string;
    data: DataProps;
    _id?: string
}

export interface DataProps {
    data: number[];
    type: string
}

export interface AnswerProps {
    text: string
    isCorrect: boolean
    images: ImageProps
    _id?: string
}

export interface QuestionProps {
    description: string
    image: ImageProps
    answers: AnswerProps[]
    _id?: string
}

export interface FormValueProps {
    title: string
    questions: QuestionProps[]
    _id?: string
}

export interface QuestionErrors {
    description?: string
    image?: string | undefined
}

export interface FormValidationErrors {
    title?: string
    questions?: QuestionErrors[]
}

export interface QuizProp {
    _id?: string
    quizzes: FormValueProps[]
}