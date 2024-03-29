import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { api } from "../apiService";
import ImageComponent from "../components/ImageComponent";
import { Link } from "react-router-dom";

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files!);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log('clicked')
        e.preventDefault()
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

    const handleDelete = async(id: string) => {
        try {
            const response = await api.delete(`/deleteImage/${id}`)
            if(response.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    return (
        <>
        <Link to={'/questions'}>Set Questions</Link>
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
            </div>
        </>
    )
}

export default Home