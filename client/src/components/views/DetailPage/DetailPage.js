import React ,{useEffect, useState} from 'react'
import axios from 'axios';

import { useParams} from 'react-router';
import { List } from 'antd';
import { Link } from 'react-router-dom';
function DetailPage(){

    const { boardId } = useParams();
    const [BoardDetail, setBoardDetail] = useState([])

    
        
    
 
    useEffect(() => {
        axios.get(`/api/boards/getboard/${boardId}`)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setBoardDetail(response.data.board)
               
            }else{
                alert("글 리스트가져오기를 실패 했습니다.")
            }
        })
       
    }, [])
 

   
        return(
            <div>
                
                 {BoardDetail.map(item => (
                    <List key={item._id} title="Board Info">
                        <List.Item>title : {item.title}</List.Item>
                        <List.Item>writer : {item.writer}</List.Item>
                        <List.Item>content : {item.content}</List.Item>
                    </List>
                ))}
                
              
            <Link to ={`/modify/${boardId}`}>글수정</Link>
            </div>
        )
    
  
}

export default DetailPage