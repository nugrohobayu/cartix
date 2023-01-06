import Link from 'next/link';
import {EditFilled, DeleteOutlined} from '@ant-design/icons';
import TableView from '../../../../../components/tableView';
import ModalAdd from '../modalAdd';
import {Button, message, Modal} from 'antd';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import appConfig from '../../../../../config/app';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const DataBank = () => {
  const router = useRouter();
  const {id} = router.query;

  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    curent: 1,
    pageSize: 5,
  });

  const getDataBank = async (params = {}) => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);

      const id_user = decode.query['id_users'];
      // const url = `${appConfig.apiUrl}/payment/all/BankPenyelenggara`;
      const url = `${appConfig.apiUrl}/payment/getby/${id_user}`;
      const result = await axios.get(url);
      const dataTables = result.data[0];
      // // console.log(dataTables);
      setDatas(dataTables);
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
    getDataBank({
      pagination,
    });
  }, []);

  const col = [
    {
      title: 'NO',
      dataIndex: 'nomor',
    },
    {
      title: 'Nama Bank',
      dataIndex: 'namaBank',
      value: 'namaBank',
      // sorter: (a, b) => a.namaBank - b.namaBank,
    },
    {
      title: 'Nama Pemilik',
      dataIndex: 'namaPemilik',
      // sorter: (a, b) => a.namaPemilik - b.namaPemilik,
    },
    {
      title: 'Nomor Rekening',
      dataIndex: 'noRekening',
    },
    {
      title: 'Aksi',
      render: (record) => {
        // console.log(record.idCreator);
        return (
          <div className="flex gap-2">
            {/* <Button
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                borderColor: '#3AB0FF',
                width: 24,
              }}>
              <Link href="/">
                <EditFilled
                  style={{
                    color: '#3AB0FF',
                    fontSize: '20px',
                  }}
                />
              </Link>
            </Button> */}
            <Button
              onClick={async () => {
                const url = `${appConfig.apiUrl}/payment/bankPenyelenggara/delete/${record.idCreator}`;
                const result = await axios.delete(url);
                // console.log(result);
                if (result.status == 200) {
                  message.success('berhasil menghapus data bank');
                }
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                borderColor: '#FF5D5D',
                width: 24,
              }}>
              {/* <Link href="/"> */}
              <DeleteOutlined
                style={{
                  color: '#FF5D5D',
                  fontSize: '20px',
                }}
              />
              {/* </Link> */}
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = datas.map((value, i) => {
    let no = i + 1;
    const data = {
      nomor: no,
      namaBank: value.nama_bank,
      namaPemilik: value.atas_nama,
      noRekening: value.bank_akun,
      idCreator: value.id_bank_penyelenggara,
    };
    return data;
  });
  // console.log(dataSource[0].idCreator);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <TableView
        btnStyle={{
          backgroundColor: '#28A745',
          color: 'white',
          borderRadius: '4px',
        }}
        linkDes={true}
        hrefDes={`/dashboard/creator/data-payment/${id}`}
        titleButton={'Tambah Data'}
        onClick={showModal}
        columns={col}
        dataSource={dataSource}
        pagination={pagination}
      />
      <Modal
        footer={null}
        title="Tambah Data Bank"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className="mx-8">
          <ModalAdd />
        </div>
      </Modal>
    </div>
  );
};

export default DataBank;
