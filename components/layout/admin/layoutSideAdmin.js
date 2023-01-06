import {Menu, Typography} from 'antd';
import {
  IdcardOutlined,
  HomeOutlined,
  FormOutlined,
  ReadOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import {useRouter} from 'next/router';

const menuList = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    icon: (
      <HomeOutlined
        style={{fontSize: '26px', color: '#3AB0FF', paddingRight: 6}}
      />
    ),
    url: '/dashboard/admin',
  },
  {
    name: 'Daftar Review',
    key: 'list_review',
    icon: (
      <FormOutlined
        style={{fontSize: '26px', color: '#3AB0FF', paddingRight: 6}}
      />
    ),
    url: '/dashboard/admin/list-review',
  },
  {
    name: 'Daftar Event',
    key: 'list_event',
    icon: (
      <ReadOutlined
        style={{fontSize: '26px', color: '#3AB0FF', paddingRight: 6}}
      />
    ),
    url: '/dashboard/admin/list-event',
  },
  {
    name: 'Daftar User',
    key: 'list_customer',
    icon: (
      <IdcardOutlined
        style={{fontSize: '26px', color: '#3AB0FF', paddingRight: 6}}
      />
    ),
    url: '/dashboard/admin/list-user',
  },
];

const LayoutSideAdmin = (props) => {
  const router = useRouter();

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
            className={'text-lg font-semibold text-sky-400 py-2 '}
            key={menu.key}
            onClick={() => {
              router.push(menu.url);
            }}
            style={{padding: 0, width: '100%'}}>
            <Link href={menu.url}>
              <div className={'flex flex-row pl-2 items-center lg:mx-4'}>
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

export default LayoutSideAdmin;
