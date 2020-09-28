import React ,{useEffect, useState} from 'react'
import axios from 'axios';

import { useParams} from 'react-router';

import { Form, Input,  Button } from 'antd';



function ModifyPage(props){
        
const {TextArea} = Input;

const [Title, setTitle] = useState("")
const [Writer, setWriter] = useState("")
const [Content, setContent] = useState("")


const { boardId } = useParams();



useEffect(() => {
    axios.get(`/api/boards/getboard/${boardId}`)
    .then(response => {
        if(response.data.success){
            console.log(response.data)
           
            setTitle((response.data.board[0].title))
            setWriter((response.data.board[0].writer))
            setContent((response.data.board[0].content))
        }else{
            alert("글 리스트가져오기를 실패 했습니다.")
        }
    })
   
}, [])
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
   
    axios.put(`/api/boards/update/${boardId}`,body)
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

        <h2>글목록</h2>
              <Form style ={{ display: 'flex', flexDirection:'column'}}
               
            >
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

export default ModifyPage