import {Button, message, Modal} from 'antd';
import Link from 'next/link';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import TableView from '../../../../components/tableView';
import {useEffect, useState} from 'react';
import appConfig from '../../../../config/app';
import axios from 'axios';
import {useRouter} from 'next/router';
import jwtDecode from 'jwt-decode';
import ModalAdd from '../data-payment/modalAdd';
import AddCategory from './modal/addCategory';

const getCol = (showModal) => {
  return [
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
      // sorter: (a, b) => a.tanggal_event - b.tanggal_event,
    },
    {
      title: 'Lokasi',
      dataIndex: 'lokasi',
      // sorter: (a, b) => a.lokasi - b.lokasi,
    },
    {
      title: 'Tiket Terjual',
      dataIndex: 'tiket_terjual',
    },
    {
      title: 'Detail Tiket',
      render: (record) => {
        return record?.kategori.map((val) => {
          return <div>{val}</div>;
        });
      },
    },
    {
      title: 'Kategori Tiket',
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <Link href={`/dashboard/creator/managementEvent/${record.id}`}>
              <Button
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#3AB0FF',
                  fontWeight: 600,
                  borderRadius: 4,
                }}
                onClick={() => showModal(record)}>
                <PlusOutlined
                  style={{
                    color: '#3AB0FF',
                    fontSize: '20px',
                  }}
                />
                Kategori
              </Button>
            </Link>
          </div>
        );
      },
    },
    // {
    //   title: 'Aksi',
    //   render: (record) => {
    //     return (
    //       <Button
    //         onClick={async () => {
    //           const url = `${appConfig.apiUrl}/event/delete/${record.id}`;
    //           const response = await axios.delete(url);
    //           const res = response.status;
    //           if (res === 200 || res === 201) {
    //             message.info('Event berhasil dihapus!');
    //             record?.router.push(`/dashboard/creator/managementEvent/`);
    //           } else {
    //             message.error('Ada Yang Salah');
    //           }
    //         }}
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           borderRadius: 4,
    //           borderColor: '#FF5D5D',
    //           width: 24,
    //         }}>
    //         <DeleteOutlined
    //           style={{
    //             color: '#FF5D5D',
    //             fontSize: '20px',
    //           }}
    //         />
    //       </Button>
    //     );
    //   },
    // },
  ];
};
const EventAktif = () => {
  const [pagination, setPagination] = useState({
    curent: 1,
    pageSize: 5,
  });
  const [data, setData] = useState([]);
  const router = useRouter();
  const {id} = router.query;
  // const [idEvent, setIdEvent] = useState([]);
  // const [dataEvents, setDataEvents] = useState('');
  // const [category, setCategory] = useState([]);

  const getDataEvent = async (params = {}) => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);

      const id_user = decode.query['id_users'];
      const url = `${appConfig.apiUrl}/event/table/test/${id_user}`;
      const result = await axios.get(url);
      const dataEvent = result.data;
      setData(dataEvent);
      setPagination({
        ...params.pagination,
      });
    } catch (error) {
      console.log(error);
      // message.error('Something Wrong');
    }
  };

  const handleTableChange = (newPagination) => {
    getDataBank({
      pagination: newPagination,
    });
  };

  useEffect(() => {
    getDataEvent({
      pagination,
    });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const temp = data.map((value, i) => {
    let no = i + 1;
    const datas = {
      nomor: no,
      id: value.id_events,
      nama_event: value.namaEvents,
      tanggal_event: value.tanggalEvents,
      lokasi: value.lokasi,
      tiket_terjual: value.kuantitas,
      kategori: value.namaKategori,
    };
    return datas;
  });

  return (
    <>
      <TableView
        btnStyle={{
          backgroundColor: '#28A745',
          color: 'white',
          borderRadius: '4px',
        }}
        search={false}
        titleSearch={'Cari Event'}
        linkDes={true}
        hrefDes={`/dashboard/creator/create-event/${id}`}
        titleButton={'Buat Event'}
        columns={getCol(showModal)}
        dataSource={temp}
        pagination={pagination}
      />
      <Modal
        footer={null}
        title="Tambah Kategori Tiket"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className="mx-8">
          <AddCategory />
        </div>
      </Modal>
    </>
  );
};

export default EventAktif;
