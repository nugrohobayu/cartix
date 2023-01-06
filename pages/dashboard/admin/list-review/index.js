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
    title: 'Nama Event',
    dataIndex: 'nama_event',
  },
  {
    title: 'Penyelenggara',
    dataIndex: 'penyelenggara',
  },
  {
    title: 'Nilai Rating',
    dataIndex: 'rating',
  },
  {
    title: 'Komentar',
    dataIndex: 'komentar',
  },
];
export default function review() {
  const [datas, setDatas] = useState([]);

  const getDataReview = async () => {
    try {
      const url = `${appConfig.apiUrl}/event/all/ulasan`;
      const result = await axios.get(url);
      const data = result.data[0];
      setDatas(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataReview();
  }, []);
  //   console.log(datas);

  const dataSource = datas.map((val, i) => {
    const no = i + 1;
    const data = {
      nomor: `${no}`,
      nama_event: val?.orders?.events?.nama_event,
      penyelenggara: val?.orders?.events?.nama_penyelenggara,
      rating: val.rating,
      komentar: val.komentar,
    };
    return data;
  });
  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Daftar Review',
      path: '/dashboard/admin/list-review',
    },
  ];
  return (
    <DefaultLayoutAdmin>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />
      <Table columns={col} dataSource={dataSource} />
    </DefaultLayoutAdmin>
  );
}
