import React, {useState} from 'react';
import {Layout, Typography, Image} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import LayoutFooter from '../layoutFooter';
import LayoutSideCreator from './layoutSideCreator';
import LayoutHeaderCreator from './layoutHeaderCreator';
const {Sider, Header, Content, Footer} = Layout;
const {Paragraph, Text} = Typography;

const LayoutMainCreator = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout hasSider={true}>
        <Layout style={{position: 'fixed'}}>
          <Sider
            // collapsible
            // collapsed={collapsed}
            // onCollapse={(value) => setCollapsed(value)}
            width={260}
            style={{
              paddingTop: 46,
              height: '100vh',
              background: '#ffffff',
              borderRight: '2px solid rgba(202, 202, 202, 0.5)',

              // marginRight: "70px",
            }}>
            {/* <div className="justify-center w-32 mx-auto mt-6">
              <img src="../../../img/logo-putih.png"></img>
            </div> */}
            <LayoutSideCreator />
          </Sider>
        </Layout>
        <Layout>
          <LayoutHeaderCreator />
          <Content
            style={{
              marginLeft: 260,
              marginTop: 70,
              // minHeight: '85vh',
              // backgroundColor: '#EEEEEE',
            }}
            className={'pr-4 pl-5 bg-white '}>
            {children}
          </Content>
          {/* <LayoutFooter style={{position: 'fixed'}} /> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutMainCreator;
