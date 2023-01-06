import {Table} from 'antd';
import axios from 'axios';
import {useEffect, useState} from 'react';
import BreadcrumbView from '../../../../components/breadcrumbView';
import DefaultLayoutAdmin from '../../../../components/defaultLayoutAdmin';
import appConfig from '../../../../config/app';

const col = [
  {
    title: 'NO',
    dataIndex: 'nomor',
  },
  {
    title: 'Nama',
    dataIndex: 'nama',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'No Telepon',
    dataIndex: 'no_tlp',
  },
  {
    title: 'Jenis Kelamin',
    dataIndex: 'jenis_kelamin',
  },
];
export default function ListUser() {
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    curent: 1,
    pageSize: 5,
  });

  const getDataEvent = async (params = {}) => {
    try {
      const url = `${appConfig.apiUrl}/users`;
      const result = await axios.get(url);
      setDatas(result.data.data);
      setPagination({
        ...params.pagination,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleTableChange = (newPagination) => {
    getDataBank({
      pagination: newPagination,
    });
  };

  useEffect(() => {
    getDataEvent({pagination});
  }, []);
  //   console.log(datas);

  const dataSource = datas.map((val, i) => {
    const no = i + 1;
    const data = {
      nomor: `${no}`,
      nama: val.username,
      email: val.email,
      no_tlp: val.no_telepon,
      jenis_kelamin: val.jenis_kelamin,
    };
    return data;
  });
  //   console.log(dataSource);

  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Daftar User',
      path: '/dashboard/admin/list-user',
    },
  ];
  return (
    <>
      <DefaultLayoutAdmin>
        <BreadcrumbView isBreadcrumb={isBreadcrumb} />
        <Table pagination={pagination} columns={col} dataSource={dataSource} />
      </DefaultLayoutAdmin>
    </>
  );
}
