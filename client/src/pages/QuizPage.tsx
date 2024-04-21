import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../apiService"
import { FormValueProps } from "../Types"
import ImageComponent from "../components/ImageComponent"

const QuizPage: FC = () => {
  const { quizId } = useParams()
  const [quizzes, setQuizzes] = useState<FormValueProps[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await api.get(`/getOneQuestion/${quizId}`)
        if (response.status === 200) {
          setQuizzes(response.data.quiz.quizzes)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getQuiz()
  }, [quizId])

  console.log(quizzes)


  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <div className="leading-10">
      {quizzes.map((quiz, quizIndex) => (
        <div key={quiz._id}>
          <div className="flex justify-center items-center h-screen">
            <div>
              <div>
                <h5 className="text-xl font-bold">{quiz.title.charAt(0).toUpperCase() + quiz.title.slice(1, quiz.title.length)}</h5>
              </div>
              <div>
                {quiz.questions.map((question, index) => (
                  <>
                    <div key={question._id}>
                      <div className="flex gap-2">
                        <p>{index + 1}.</p>
                        <h5>{question.description}</h5>
                      </div>
                      <ImageComponent index={question._id} imageData={question.image.data.data} contentType={question.image.contentType} />
                    </div>
                    <p>Answers</p>
                    <div className="flex gap-6">
                      {question.answers.map((ans) => (
                        <>
                          <button>
                            {ans.text}
                            <ImageComponent index={ans._id} imageData={ans.images.data.data} contentType={ans.images.contentType} />
                          </button>
                        </>
                      ))}
                    </div>
                    <br />
                  </>
                ))}
              </div>
              <div className="flex justify-between">
                {quizIndex > 0 && (
                  <button onClick={() => setCurrentQuestionIndex((prevIndex) => prevIndex - 1)} className="text-red-500">Previous</button>
                )}
                {quizIndex < quizzes.length - 1 && (
                  <button onClick={() => setCurrentQuestionIndex((prevIndex) => prevIndex + 1)} className="text-green-600">Next</button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuizPage