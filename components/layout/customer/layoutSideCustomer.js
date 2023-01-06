import {Menu, Typography} from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SyncOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import {useRouter} from 'next/router';

const LayoutSideCustomer = (props) => {
  const router = useRouter();
  const {id} = router.query;

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
      url: `/dashboard/customer/${id}`,
    },
    {
      name: 'Daftar Tiket',
      key: 'tiket',
      icon: <SnippetsOutlined style={styleMenuList} />,
      url: `/dashboard/customer/tickets/${id}`,
    },
    {
      name: 'Akun Saya',
      key: 'akun',
      icon: <UserOutlined style={styleMenuList} />,
      url: `/dashboard/customer/profile/${id}`,
    },
    {
      name: 'Beralih ke Creator',
      key: 'beralih_akun',
      icon: <SyncOutlined style={styleMenuList} />,
      url: `/dashboard/creator/${id}`,
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
            style={{padding: 0}}>
            <Link href={menu.url}>
              <div className={'flex flex-row items-center lg:mx-4'}>
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

export default LayoutSideCustomer;
