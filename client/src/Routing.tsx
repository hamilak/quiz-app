import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Questions from "./pages/Questions"
import QuizPage from "./pages/QuizPage"

const Routing:FC = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
        <Route path="/quiz/:quizId" element={<QuizPage />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Routing