import React ,{useEffect, useState} from 'react'
import axios from 'axios';

import { useParams} from 'react-router';
import { List, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
function DetailPage(props){

    const { boardId } = useParams();
    const [BoardDetail, setBoardDetail] = useState([])

    
        
    const { confirm } = Modal;
    
 
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
 
    const showDeleteConfirm=(e) =>{
       
        //console.log(target)
        confirm({
          title: 'Are you sure delete this task?',
        //   icon: <ExclamationCircleOutlined />,
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            onDelete()
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    const onDelete =(e) =>{
       
        //console.log(target)
        axios.delete(`/api/boards/${boardId}`)
        .then(response => {
            if(response.data.success){
               
                props.history.push('/list')
                
            }else{
                alert("삭제실패")
            }
        })
       
        
    }

   
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
            <button onClick={showDeleteConfirm}> Delete </button>
            </div>
        )
    
  
}

export default DetailPage