import React ,{useState} from 'react';
import axios from 'axios';
import { Form, Input,  Button ,Typography} from 'antd';


function WritePage(props){

    
const {TextArea} = Input;

const [Title, setTitle] = useState("")
const [Writer, setWriter] = useState("")
const [Content, setContent] = useState("")


const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value)
}
const onWriterHandler = (event) => {
    setWriter(event.currentTarget.value)
}
const onContentHandler = (event) => {
    setContent(event.currentTarget.value)
}

const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
        title : Title,
        writer : Writer,
        content : Content
    }
   
    axios.post('/api/boards/write',body)
        .then(response => {
            if(response.data.success){
                props.history.push('/list')
            } else{
                alert('error')
            }
    })
}

    return(
        <div>

            <h2>글작성</h2>
            <Form>
                <label>Title</label>
                <Input value={Title} onChange={onTitleHandler}/>
                <label>Writer</label>
                <Input value={Writer} onChange={onWriterHandler}/>
                <label>Content</label>
                <TextArea value={Content} onChange={onContentHandler}/>
                <br/>

                <Button type="primary" size="large" onClick={onSubmitHandler}>
                    Submit
                </Button>

            </Form>
            
        </div>
    )
}

export default WritePage