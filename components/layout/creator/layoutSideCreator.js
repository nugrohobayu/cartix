import {Menu, Typography} from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SyncOutlined,
  DollarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import {useRouter} from 'next/router';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import appConfig from '../../../config/app';
import {useEffect, useState} from 'react';

const LayoutSideCreator = (props) => {
  const router = useRouter();
  const [idUser, setIdUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);

      const id = decode.query['id_users'];
      await axios.get(`${appConfig.apiUrl}/users/${id}`).then((datas) => {
        const dataUser = datas.data.data;
        setIdUser(dataUser['id_users']);
      });
    } catch (error) {}
  };

  const styleMenuList = {
    fontSize: '26px',
    color: '#3AB0FF',
    paddingRight: 4,
  };

  const menuList = [
    {
      name: 'Dashboard',
      key: 'dashboard',
      icon: <HomeOutlined style={styleMenuList} />,
      url: `/dashboard/creator/${idUser}`,
    },
    {
      name: 'Management Event',
      key: 'management_event',
      icon: <AppstoreOutlined style={styleMenuList} />,
      url: `/dashboard/creator/managementEvent/${idUser}`,
    },
    {
      name: 'Pembayaran',
      key: 'payment',
      icon: <DollarOutlined style={styleMenuList} />,
      url: `/dashboard/creator/data-payment/${idUser}`,
    },
    {
      name: 'Akun Saya',
      key: 'akun',
      icon: <UserOutlined style={styleMenuList} />,
      url: `/dashboard/creator/profile/${idUser}`,
    },
    {
      name: 'Beralih ke Pembeli',
      key: 'beralih',
      icon: <SyncOutlined style={styleMenuList} />,
      url: `/dashboard/customer/${idUser}`,
    },
  ];

  return (
    <Menu
      theme="light"
      className={'text-lg menu-color text-white'}
      defaultSelectedKeys={['1']}
      mode="inline"
      style={{marginTop: '5vh', background: '#ffffff', width: '100%'}}>
      {menuList.map((menu) => {
        return (
          <Menu.Item
            className={'text-lg font-semibold text-sky-400 py-2'}
            key={menu.key}
            onClick={() => {
              router.push(menu.url);
            }}
            style={{padding: 0, width: '100%'}}>
            <Link href={menu.url}>
              <div className={'flex flex-row items-center lg:mx-4 '}>
                {menu.icon}
                <Typography.Text style={{color: '#3AB0FF'}}>
                  {menu.name}
                </Typography.Text>
              </div>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default LayoutSideCreator;
