import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import { Table,Modal,Spin } from 'antd';

import { Link ,withRouter} from 'react-router-dom';



function ListPage(props){
   
    const [loading, setloading] = useState(true)
    const [Board, setBoard] = useState([])
    
   

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
        }
    ]
 

    useEffect(() => {
        axios.get('/api/boards/list')
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setBoard(response.data.boards)
                setloading(false)
            }else{
                alert("글 리스트가져오기를 실패 했습니다.")
            }
        })
       
    }, [])
    if (loading) 
        return <div><Spin tip="Loading..."></Spin></div>
 
  
  
    return(
        <div>
            <h2>글목록</h2>
            
         

           <Table rowKey={record => record._id} columns={columns} dataSource={Board}  />
          
        </div>
    )
}

export default withRouter(ListPage)