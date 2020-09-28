import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import { Table,Popconfirm, message,Button } from 'antd';

import { Link } from 'react-router-dom';



function ListPage(props){
   
  
    const [Board, setBoard] = useState([])
    
    const onDelete =(e) =>{
        const target = e.target.getAttribute('data-msg');
        axios.delete(`/api/boards/${target}`)
        .then(response => {
            if(response.data.success){
                alert("삭제 완료")
                
            }else{
                alert("삭제실패")
            }
        })
       
        console.log(target)
    }
    const columns = [
        {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',   
        render: (text, record) => <Link to ={`/detail/${record._id}`}>{text}</Link>
        },
        {
        title: 'Writer',
        dataIndex: 'writer',
        key: 'writer',
        },
        {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record)=>
               
            <button onClick={onDelete} data-msg={`${record._id}`}> Delete </button>
                
        }
    ]


    useEffect(() => {
        axios.get('/api/boards/list')
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setBoard(response.data.boards)
            }else{
                alert("글 리스트가져오기를 실패 했습니다.")
            }
        })
       
    }, [])
 
  
  
    return(
        <div>
            <h2>글목록</h2>
            
         

           <Table rowKey={record => record._id} columns={columns} dataSource={Board} />
           
        </div>
    )
}

export default ListPage