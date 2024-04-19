import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { api } from "../apiService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Image1 from '../assets/undraw_online_test_re_kyfx.svg'
import Image2 from '../assets/undraw_my_answer_re_k4dv.svg'
import Image3 from '../assets/undraw_questions_re_1fy7.svg'
import Image4 from '../assets/undraw_quick_chat_re_bit5.svg'
import Image5 from '../assets/undraw_quiz_re_aol4.svg'

interface ImageProps {
    contentType: string;
    data: DataProps;
    _id: string
}

interface DataProps {
    data: number[];
    type: string
}

const Home: FC = () => {
    const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
    const [images, setImages] = useState<ImageProps[]>([])
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files!);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(images)
        console.log(selectedFile)
        if (selectedFile) {
            const formData = new FormData();
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('image', selectedFile[i]);
            }
            console.log(formData.getAll('image'));
            try {
                const response = await api.post('/uploadMultiple', formData)
                if (response.status === 201) {
                    window.location.reload()
                }
            } catch (error) {
                console.log("Error: ", error)
            }
        }
    }

    const getImages = async () => {
        try {
            const response = await api.get('/images')
            if (response.status === 200) {
                console.log(response)
                setImages(response.data)
            }
        } catch (error) {
            console.log(`Error fetching images ${error}`)
        }
    }

    useEffect(() => {
        getImages()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            const response = await api.delete(`/deleteImage/${id}`)
            if (response.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    const handleNavigateQuizPage = (title: string) => {
        navigate(`/quiz`, {state: { title }})
    }

    return (
        <>
            {/* <Link to={'/questions'}>Set Questions</Link>
            <div>
                <h5>Home</h5>
                <form onSubmit={handleSubmit}>
                    <label>File</label>
                    <br />
                    <input multiple onChange={handleChange} type="file" />
                    <br />
                    <button type="submit">Upload</button>
                </form>
            </div>
            <div>
                <h6>Uploads</h6>
                <div>
                    {images.map((img) => (
                        <ImageComponent index={img._id} imageData={img.data.data} contentType={img.contentType} handleDelete={() => handleDelete(img._id)} />
                    ))}
                </div>
            </div> */}
            <div>
                <div className="flex justify-center h-screen items-center text-center">
                    <div>
                        <div className="mb-4 flex justify-center">
                            {/* <motion.h1 className="text-2xl font-bold"
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
                            <h5 className="text-2xl font-bold">
                            Welcome to the quizz app
                            </h5>
                        </div>
                        <div className="flex justify-center m-4" >
                            <img width={200} src={Image1} alt="Quizz" />
                        </div>
                        <div>
                            <p>This is a quiz app where you select an option from the list below and answer the questions.</p>
                        </div>
                        <div className="mt-4 flex gap-4 justify-center">
                            <div>
                                <h5 className="font-bold">Quiz 1</h5>
                                <div className="m-4 h-20">
                                    <img width={100} src={Image2} alt="Quizz" />
                                </div>
                                <button className="underline" onClick={() => handleNavigateQuizPage('Quiz 1')}>Start</button>
                            </div>
                            <div>
                                <h5 className="font-bold">Quiz 2</h5>
                                <div className="m-4 h-20">
                                    <img width={100} src={Image3} alt="Quizz" />
                                </div>
                                <button disabled className="underline" onClick={() => handleNavigateQuizPage('Quiz 2')}>Start</button>
                            </div>
                            <div>
                                <h5 className="font-bold">Quiz 3</h5>
                                <div className="m-4 h-20">
                                    <img width={100} src={Image4} alt="Quizz" />
                                </div>
                                <button disabled className="underline" onClick={() => handleNavigateQuizPage('Quiz 3')}>Start</button>
                            </div>
                            <div>
                                <h5 className="font-bold">Quiz 4</h5>
                                <div className="m-4 h-20">
                                    <img width={100} src={Image1} alt="Quizz" />
                                </div>
                                <button disabled className="underline" onClick={() => handleNavigateQuizPage('Quiz 4')}>Start</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home