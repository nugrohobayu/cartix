import {Table} from 'antd';
import axios from 'axios';
import {useEffect, useState} from 'react';
import BreadcrumbView from '../../../../components/breadcrumbView';
import DefaultLayoutAdmin from '../../../../components/defaultLayoutAdmin';
import appConfig from '../../../../config/app';

const isBreadcrumb = [
  {
    name: 'Kamu disini',
  },
  {
    name: 'Daftar Event',
    path: '/dashboard/admin/list-event',
  },
];

const col = [
  {
    title: 'NO',
    dataIndex: 'nomor',
  },
  {
    title: 'Nama Event',
    dataIndex: 'nama_event',
  },
  {
    title: 'Tanggal Event',
    dataIndex: 'tanggal_event',
  },
  {
    title: 'Lokasi',
    dataIndex: 'lokasi',
  },
  {
    title: 'Status Event',
    dataIndex: 'status',
  },
];
export default function ListEvent() {
  const [pagination, setPagination] = useState({
    curent: 1,
    pageSize: 5,
  });
  const [datas, setDatas] = useState([]);

  const getDataEvent = async (params = {}) => {
    try {
      const url = `${appConfig.apiUrl}/event`;
      const result = await axios.get(url);
      const data = result.data[0];
      setDatas(data);
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

  const dataSource = datas.map((val, i) => {
    const no = i + 1;
    const data = {
      nomor: `${no}`,
      nama_event: val.nama_event,
      tanggal_event: val.tanggal_event,
      lokasi: val.alamat,
      status: val.status_event,
    };
    return data;
  });
  return (
    <DefaultLayoutAdmin>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />
      <Table pagination={pagination} columns={col} dataSource={dataSource} />
    </DefaultLayoutAdmin>
  );
}
