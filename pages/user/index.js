import {Form, Breadcrumb, Tabs} from 'antd';
import DefaultLayoutCustomer from '../../components/defaultLayoutCustomer';
import TabView from '../../components/tabs';
import UserPassword from './UserPassword';
import UserProfil from './UserProfil';
const {TabPane} = Tabs;

const Profil = () => {
  const isTabs = [
    {
      name: 'Profil Saya',
      des: <UserProfil />,
    },
    {
      name: 'Kata Sandi',
      des: <UserPassword />,
    },
  ];

  return (
    <>
      <TabView isTabs={isTabs} />
    </>
  );
};

export default Profil;
