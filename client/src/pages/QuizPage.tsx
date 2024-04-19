import { FC } from "react"
import { useLocation } from "react-router-dom"

const QuizPage:FC = () => {
    const { state } = useLocation()
    const title = state && state.title ? state.title : null

  return (
    <div>
        QuizPage<br />
        {title}
    </div>
  )
}

export default QuizPage