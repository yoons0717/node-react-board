import React from 'react';

import 'antd/dist/antd.css';

import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';





function NavBar() {
    return (
       
       
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {/* <Menu.Item key="home"><a href="/">HOME</a></Menu.Item>
        <Menu.Item key="board"><a href="/list"></a>LISTS</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
        <Menu.Item key="home"><Link to="/">HOME</Link></Menu.Item>
        <Menu.Item key="board"><Link to ="/list"></Link>LISTS</Menu.Item>
        <Menu.Item key="write"><Link to ="/write"></Link>WRITE</Menu.Item>
      </Menu>
   

    )
}

export default NavBar
