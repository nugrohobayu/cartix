import {Layout} from 'antd';
import LayoutFooter from '../layoutFooter';
import LayoutHeaderAdmin from './layoutHeaderAdmin';
import LayoutSideAdmin from './layoutSideAdmin';
const {Sider, Header, Content, Footer} = Layout;

const LayoutMainAdmin = ({children}) => {
  return (
    <div>
      <Layout hasSider={true}>
        <Layout style={{position: 'fixed'}}>
          <Sider
            width={260}
            style={{
              height: '100vh',
              background: '#ffffff',
              borderRight: '2px solid rgba(202, 202, 202, 0.5)',

              // marginRight: "70px",
            }}>
            <div className="justify-center w-32 mx-auto mt-6">
              <img src="../../img/logo-putih.png"></img>
            </div>
            <LayoutSideAdmin />
          </Sider>
        </Layout>
        <Layout>
          <LayoutHeaderAdmin />
          <Content
            style={{
              marginLeft: 260,
              marginTop: 70,
              // minHeight: '85vh',
              // backgroundColor: '#eeeeee',
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

export default LayoutMainAdmin;
