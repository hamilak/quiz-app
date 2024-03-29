import { FC } from "react"

interface ImageProps {
    index: string;
    imageData: number[];
    contentType: string;
    handleDelete: () => void;
}

const ImageComponent: FC<ImageProps> = ({ index, imageData, contentType, handleDelete }) => {
    const uint8Array = new Uint8Array(imageData);
    const blob = new Blob([uint8Array], { type: contentType });
    const imageUrl = URL.createObjectURL(blob);

    return (
        <div>
            <img width={100} src={imageUrl} alt={`Image ${index}`} />
            <button onClick={handleDelete} style={{
                top: 0,
                right: 0,
                color: 'black',
                padding: '5px',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
            }}>Delete</button>
        </div>
    )
}

export default ImageComponent