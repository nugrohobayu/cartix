import React, {useState} from 'react';
import {Layout, Typography} from 'antd';
import LayoutSideCustomer from './layoutSideCustomer';
import LayoutHeaderCustomer from './layoutHeaderCustomer';
import LayoutFooter from '../layoutFooter';
const {Sider, Header, Content, Footer} = Layout;
const {Paragraph, Text} = Typography;

const LayoutMainCustomer = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Layout hasSider={true}>
        <Layout style={{position: 'fixed'}}>
          <Sider
            width={260}
            style={{
              paddingTop: 46,
              height: '100vh',
              background: '#ffffff',
              borderRight: '2px solid rgba(202, 202, 202, 0.5)',
            }}
            //onCollapse={(value) => setCollapsed(value)}
          >
            {/* <div className="justify-center w-32 ml-10 mt-6 ">
              <img src="../../../img/logo-putih.png"></img>
            </div> */}
            <LayoutSideCustomer />
          </Sider>
        </Layout>

        <Layout>
          <LayoutHeaderCustomer />
          <Content
            style={{
              marginLeft: 260,
              marginTop: 70,
              minHeight: '100vh',
              // backgroundColor: '#EEEEEE',
            }}
            className={'pr-4 pl-5 bg-white'}>
            {children}
          </Content>
          {/* <LayoutFooter style={{position: 'fixed'}} /> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutMainCustomer;
