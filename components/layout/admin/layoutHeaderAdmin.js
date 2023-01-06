import {Layout} from 'antd';
import {useRouter} from 'next/router';
import PopoverView from '../../popoverView';

const {Sider, Header, Content, Footer} = Layout;

const LayoutHeaderAdmin = () => {
  const router = useRouter();
  // let headerTitle = 'title';

  // switch (router.pathname) {
  //   case '/dashboard/admin':
  //     headerTitle = 'Dashboard';
  //     break;
  //   case '/dashboard/admin/list-report':
  //     headerTitle = 'Daftar Report';
  //     break;
  //   case '/dashboard/admin/list-event':
  //     headerTitle = 'Daftar Event';
  //     break;
  //   case '/dashboard/admin/list-customer':
  //     headerTitle = 'Daftar Customer';
  //     break;
  // }
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
      <div className="text-3xl font-semibold text-slate-600">
        <img className="w-28" src="../../../img/logo-putih.png"></img>
      </div>
      <div className="pr-14">
        <PopoverView />
      </div>
    </Header>
  );
};

export default LayoutHeaderAdmin;
