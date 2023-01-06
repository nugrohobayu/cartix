import Link from 'next/link';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import TableView from '../../../../components/tableView';
import {Button, Image, message} from 'antd';
import {useEffect, useState} from 'react';
import appConfig from '../../../../config/app';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useRouter} from 'next/router';

const col = [
  {
    title: 'No',
    dataIndex: 'nomor',
  },
  {
    title: 'Nama Pengirim',
    dataIndex: 'nama_pengirim',
  },
  {
    title: 'No Telepon',
    dataIndex: 'nominal',
  },
  {
    title: 'Bukti Pembayaran',
    render: (record) => {
      return (
        <div>
          <Image width={100} src={`${record.bukti_pembayaran}`} />
        </div>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Aksi',
    render: (record) => {
      const router = useRouter();
      const idOrder = record?.id_orders;
      const idCategory = record?.id_kategori;
      return (
        <div className="flex gap-2">
          <div>
            <Button
              onClick={async () => {
                const url = `${appConfig.apiUrl}/payment/edit/status/approved/${idOrder}/${idCategory}`;
                const response = await axios.put(url);
                const res = response.status;
                if (res === 200 || res === 201) {
                  message.info('Pembayaran Terkonfirmasi!');
                  router.push(`/dashboard/creator/data-payment/`);
                } else {
                  message.error('Ada Yang Salah');
                }
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                borderColor: '#3CCF4E',
                width: 24,
              }}>
              <CheckOutlined
                style={{
                  color: '#3CCF4E',
                  fontSize: '20px',
                }}
              />
            </Button>
          </div>

          <div>
            <Button
              onClick={async () => {
                const url = `${appConfig.apiUrl}/payment/status/rejected/${idOrder}`; //
                const response = await axios.put(url);
                const res = response.status;

                if (res === 200 || res === 201) {
                  message.warning('Pembayaran ditolak!');
                  router.push(`/dashboard/creator/data-payment/`);
                } else {
                  message.error('Ada Yang Salah');
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
              <CloseOutlined
                style={{
                  color: '#FF5D5D',
                  fontSize: '20px',
                }}
              />
            </Button>
          </div>
        </div>
      );
    },
  },
];

const ListPayment = () => {
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    curent: 1,
    pageSize: 5,
  });

  const getListPayment = async (params = {}) => {
    try {
      const url = `${appConfig.apiUrl}/payment/pembayaran`;
      const result = await axios.get(url);
      const dataPayment = result.data[0];
      setDatas(dataPayment);
      setPagination({
        ...params.pagination,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListPayment({pagination});
  }, []);

  const handleTableChange = (newPagination) => {
    getListPayment({
      pagination: newPagination,
    });
  };
  // console.log(datas);

  const dataSource = datas.map((value, i) => {
    let no = i + 1;
    const data = {
      id_orders: value?.orders?.id_orders,
      id_kategori: value?.orders?.kategori?.id_kategori,
      id_pembayaran: value.id_pembayaran,

      nomor: no,
      nama_pengirim: value.nama_pengirim,
      nominal: value.nominal,
      bukti_pembayaran: `${appConfig.apiUrl}/upload/get/image/${value.bukti_pembayaran}`,
      status: value?.orders?.status,
    };
    return data;
  });

  return (
    <div>
      <TableView
        pagination={pagination}
        columns={col}
        dataSource={dataSource}
      />
    </div>
  );
};

export default ListPayment;
