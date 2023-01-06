import TableView from '../../../../components/tableView';
import Link from 'next/link';
import {PrinterOutlined, EditFilled} from '@ant-design/icons';
import {Button} from 'antd';
import {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import appConfig from '../../../../config/app';
import axios from 'axios';

const col = [
  {
    title: 'No',
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
    title: 'Tiket Terjual',
    dataIndex: 'tiket_terjual',
  },
  {
    title: 'Status Event',
    dataIndex: 'status',
  },
  {
    title: 'Aksi',
    render: (record) => {
      console.log(record.id);
      return (
        <Button
          onClick={async () => {
            const url = `${appConfig.apiUrl}/event/updateStatusEvents/${record.id}`;
            const result = await axios.put(url);
            console.log(result.status);
            const res = result.status;
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: '#3AB0FF',
            width: 24,
          }}>
          <EditFilled
            style={{
              color: '#3AB0FF',
              fontSize: '20px',
            }}
          />
        </Button>
      );
    },
  },
];

const HistoryEvent = () => {
  const [pagination, setPagination] = useState({
    curent: 1,
    pageSize: 5,
  });
  const [datas, setDatas] = useState([]);
  const [id_user, setId_User] = useState('');

  const getHistoryEvent = async (params = {}) => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);

      const idUser = decode.query['id_users'];
      const url = `${appConfig.apiUrl}/event/table/test/${idUser}`;
      const result = await axios.get(url);
      const dataEvent = result.data;
      setId_User(idUser);
      setDatas(dataEvent);

      setPagination({
        ...params.pagination,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (newPagination) => {
    getHistoryEvent({
      pagination: newPagination,
    });
  };

  // const exportFile = async () => {
  //   try {
  //     const url = `${appConfig.apiUrl}/event/download/excel`;
  //     const response = await axios.get(url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // exportFile();
    getHistoryEvent({
      pagination,
    });
  }, []);

  const dataSource = datas.map((value, i) => {
    // console.log(value);
    let no = i + 1;
    const data = {
      nomor: no,
      id: value.id_events,
      nama_event: value.namaEvents,
      tanggal_event: value.tanggalEvents,
      lokasi: value.lokasi,
      tiket_terjual: value.kuantitas,
      status: value.status,
    };
    return data;
  });

  return (
    <>
      <TableView
        btnStyle={{
          backgroundColor: '#FF7532',
          color: 'white',
          borderRadius: '4px',
        }}
        // onClick={exportFile}
        linkDes={true}
        hrefDes={`${appConfig.apiUrl}/event/download/excel/${id_user}`}
        search={false}
        titleSearch={'Cari Event'}
        titleButton={
          <div>
            <PrinterOutlined style={{fontSize: 20, paddingRight: 4}} />
            export
          </div>
        }
        columns={col}
        dataSource={dataSource}
        pagination={pagination}
      />
    </>
  );
};

export default HistoryEvent;
