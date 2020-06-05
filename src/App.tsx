import React, { FC } from 'react';
import './App.less';
import Logo from './assets/images/logo.png';

import { Layout } from 'antd';

import { Menu } from 'antd';
import { HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import Home from './components/Home/Home';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import PostDetails from './containers/PostDetails';

const { Header, Footer, Content } = Layout;

const App: FC = () => {

  return (
    <Router>
      <div>
        <Layout>
          <Header>
            <img alt="example"
            className="logo" style={{ width: '48px' }} src={Logo} />

            <Menu  
              defaultSelectedKeys={['/']}
              mode="horizontal" theme='dark'>
              <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link to='/'>Home</Link>
              </Menu.Item>
              <Menu.Item key="/posts" icon={<FileTextOutlined />}>
                <Link to='/posts'>Blog</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '20px 50px' }}>
            <div className="site-layout-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/posts" component={Posts}/>
                <Route path="/posts/:id" component={PostDetails}/>
              </Switch>
            </div>
          </Content>
          <Footer>
            Ant Design App © 2020 Created by Arun
          </Footer>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
