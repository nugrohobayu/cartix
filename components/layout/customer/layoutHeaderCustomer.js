import {Layout} from 'antd';
import {useRouter} from 'next/router';
import PopoverView from '../../popoverView';

const {Sider, Header, Content, Footer} = Layout;

const LayoutHeaderCustomer = (props) => {
  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 10,
        background: '#3AB0FF',
        borderBottom: '3px solid rgba(202, 202, 202, 0.5)',
        height: 70,
      }}
      className={'flex items-center justify-between site-layout-background'}>
      <img className="w-28" src="../../../img/logo-putih.png"></img>
      <div>
        <PopoverView />
      </div>
    </Header>
  );
};

export default LayoutHeaderCustomer;
