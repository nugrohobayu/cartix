import {Card, Col, Row, Modal} from 'antd';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import CardEvent from '../../../components/cardEvent';
import appConfig from '../../../config/app';
import {FormReview} from './review';
const cardStyle = {
  borderRadius: 8,
};

const HistoryEvent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datas, setDatas] = useState([]);
  const [status, setStatus] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const getDataOrder = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);
      const idUser = decode.query['id_users'];

      const url = `${appConfig.apiUrl}/payment/all/orders/${idUser}`;
      const result = await axios.get(url);
      setDatas(result.data);
      setStatus(result?.data[0].status);
      // console.log(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(status);

  useEffect(() => {
    getDataOrder();
  }, []);

  const showModal = (id) => {
    setIsModalVisible(true);
    // console.log(id, 'id');
    setOrderId(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const data = datas.map((value) => {
    const harga = value.total_harga.toLocaleString('id', {
      style: 'currency',
      currency: 'IDR',
    });
    const dataEvent = {
      src: `${appConfig.apiUrl}/upload/get/imageevent/${value?.events.banner_event}`,
      title: value?.events.nama_event,
      venue: value?.events.alamat,
      time: value?.events.waktu_event,
      date: value?.events.tanggal_event,
      // price: `${harga}`,
      href: `/event/${value?.events.id_events}`,
      id_orders: value?.id_orders,
    };
    return dataEvent;
  });
  // console.log(status);

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-start gap-2">
      {status === 'Approved' ? (
        <CardEvent
          isButton
          isCardEvent={data}
          onClick={(id) => showModal(id)}
          titleBtn={'REVIEW EVENT'}
        />
      ) : (
        <div></div>
      )}

      <Modal
        footer={false}
        title="Beri ulasan Event"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <FormReview orderId={orderId} />
      </Modal>
    </div>
  );
};

export default HistoryEvent;
