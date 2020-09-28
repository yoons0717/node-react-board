import React ,{ Suspense }from 'react';

import './App.css';
import{
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom"


import 'antd/dist/antd.css';

import { Layout, Menu, Breadcrumb } from 'antd';



import WritePage from './components/views/WritePage/WritePage';
import DetailPage from './components/views/DetailPage/DetailPage';
import LandingPage from './components/views/LandingPage/LandingPage';
import ListPage from './components/views/ListPage/ListPage';
import ModifyPage from './components/views/ModifyPage/ModifyPage';
import NavBar from './components/views/NavBar/NavBar'
import SubMenuBar from './components/views/SubMenuBar/SubMenuBar'
import Footer from './components/views/Footer/Footer'


const {  Content,  Sider } = Layout;
function App() {
  return (
    <Layout>
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      
      
      <Layout>
        <Sider className="site-layout-background" width={200}>
         <SubMenuBar/> 
         </Sider>  
         <Layout style={{ padding: '0 24px 24px' }}> 
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >     
              <Switch>           
                <Route exact path="/" component={LandingPage}/>         
                <Route exact path="/write" component={WritePage}/>         
                <Route exact path="/detail/:boardId" component={DetailPage}/>
                <Route exact path="/list" component={ListPage}/>    
                <Route exact path="/modify/:boardId" component={ModifyPage}/>    
              </Switch>
            </Content>
          </Layout>
      </Layout>
    
     
    </Suspense>
    </Layout>
    
  );
}

export default App;
