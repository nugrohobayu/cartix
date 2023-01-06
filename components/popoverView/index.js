import {Menu, Popover, Typography, Avatar} from 'antd';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import appConfig from '../../config/app';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
const {Paragraph, Text} = Typography;

const PopoverView = () => {
  useEffect(() => {
    getData();
  }, []);

  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState([]);
  const [image, setImage] = useState('');

  const getData = async () => {
    try {
      const jwtToken = localStorage.getItem('accessToken');
      const decode = jwtDecode(jwtToken);

      const id = decode.query['id_users'];
      const url = `${appConfig.apiUrl}/users/${id}`;

      await axios.get(url).then((datas) => {
        const dataUser = datas.data.data;
        setUsername(dataUser);
        setImage(dataUser.gambar);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* <span className="capitalize mr-3 text-white text-lg font-semibold">
        {username.username}
      </span> */}

      <Popover
        autoAdjustOverflow={true}
        placement="bottomRight"
        content={
          <Menu
            type={'line'}
            inlineIndent={0}
            theme="light"
            className={'bg-transparent border-r-0'}
            mode="inline">
            <Menu.Item
              onClick={() => {
                router.push('/');
              }}>
              <div className={'flex items-center'}>
                <HomeOutlined />
                <span className="mr-4">Home</span>
              </div>
            </Menu.Item>
            {/* <Menu.Item
              onClick={() => {
                router.push('/dashboard/creator/profile');
              }}>
              <div className={'flex items-center'}>
                <span className="mr-4">Profil Saya</span>
                <UserOutlined />
              </div>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                router.push('/dashboard/creator/profile');
              }}>
              <div className={'flex items-center'}>
                <span className="mr-4">Kata Sandi</span>
                <KeyOutlined />
              </div>
            </Menu.Item> */}
            <Menu.Item
              onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tokenAdmin');
                localStorage.removeItem('tokenUsers');

                router.push('/');
                // store.authentication.logout();
                //return history.push("/auth/login");
              }}>
              <div className={'flex items-center'}>
                <LogoutOutlined style={{color: 'red'}} />
                <span className="mr-3 text-red-500">Keluar</span>
              </div>
            </Menu.Item>
          </Menu>
        }
        title={
          <Text>
            <Paragraph type={'secondary-dark capitalize'}>
              Hi, {username.username}
            </Paragraph>
          </Text>
        }
        trigger="click"
        visible={clicked}
        onVisibleChange={() => setClicked(!clicked)}>
        {image ? (
          <img
            className="w-10 rounded-full bg-sky-800"
            src="../../../img/avatar.png"
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: '#0078AA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={42}
            icon={
              <UserOutlined style={{textAlign: 'center', marginBottom: 4}} />
            }
          />
        )}
      </Popover>
    </>
  );
};

export default PopoverView;
