import { FC, useEffect } from "react"
import { useParams } from "react-router-dom"
import { api } from "../apiService"

const QuizPage: FC = () => {
  const { quizId } = useParams()


  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await api.get(`/getOneQuestion`)
        console.log('response: ', response)
      } catch (error) {
        console.error(error)
      }   
    }

    getQuiz()
  }, [])
  return (
    <div>
      QuizPage<br />

    </div>
  )
}

export default QuizPage