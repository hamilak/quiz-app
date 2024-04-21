import { FC, useEffect, useState } from "react"
import { api } from "../apiService";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import Image1 from '../assets/undraw_online_test_re_kyfx.svg'
import { QuizProp } from "../Types";

const Home: FC = () => {
    const [quizzes, setQuizzes] = useState<QuizProp[]>([])

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
            <div>
                <div className="flex h-full items-center text-left">
                    <div style={{ height: "100vh" }} className=" flex items-center bg-white p-10">
                        <div>
                        <div className="flex justify-center items-center">
                            {/* <motion.h1 className="text-2xl font-bold text-black"
                                animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 5,
                                    delay: 0.3,
                                    ease: [0.5, 0.71, 1, 1.5],
                                }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileHover={{ scale: 1.2 }}>
                                Welcome to the quizz app
                            </motion.h1> */}
                            <h5 className="text-2xl font-bold text-black">
                                Welcome to the quizz app
                            </h5>
                        </div>
                        <div className="flex justify-center m-4" >
                            <img width={200} src={Image1} alt="Quizz" />
                        </div>
                        <div>
                            <p className="text-black">This is a quiz app where you select an option from the list and answer the questions.</p>
                        </div>
                        </div>
                    </div>
                    <div className="mt-4 p-10">
                        <h5 className="text-xl font-bold">Quizzes</h5>
                        <div className="mt-4 flex gap-4 justify-center">
                            <div className="list-disc text-left">
                                {quizzes && quizzes.map((quiz) => (
                                    <>
                                        {Object.values(quiz.quizzes).map((item) => (
                                            <Link to={`/quiz/${quiz._id}`}>
                                                <li className="text-xl font-bold hover:text-orange-400 ">{item.title.charAt(0).toUpperCase() + item.title.slice(1, item.title.length)}</li>
                                            </Link>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home