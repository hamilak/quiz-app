import { FC, useState } from "react"

const Questions: FC = () => {
    const [question, setQuestion] = useState<string>('')

    // const handleCreate = () => {
    //     setQuestion
    // }
    return (
        <>
            <div style={{ margin: '60px auto', width: '50%' }}>
                <div>
                    <h3>Set Questions</h3>
                    <form>
                        <div style={formControl}>
                            <label htmlFor="question">Question</label>
                            <br />
                            <input id="question" value={question} style={inputStyle} type="text" />
                            <br />
                        </div>
                        <div style={formControl}>
                            <label>Options (upload 5 images)</label>
                            <br />
                            <input style={inputStyle} multiple type="file" />
                            <br />
                        </div>
                        <div style={formControl}>
                            <label>Label</label>
                            <br />
                            <input style={inputStyle} type="text" />
                            <br />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button style={buttonStyle}>Create</button>
                        </div>
                    </form>
                </div>
                <br />
                <div>
                    <h5>Questions list</h5>
                    {question && (
                      <ul>
                        <li>{question}</li>
                    </ul>  
                    )}
                    
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
    marginTop: '6px'
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