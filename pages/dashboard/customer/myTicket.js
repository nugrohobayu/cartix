import Link from 'next/link';
import {Card, Col, Row} from 'antd';
import CardEvent from '../../../components/cardEvent';
import {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import appConfig from '../../../config/app';
import axios from 'axios';
const cardStyle = {
  borderRadius: 8,
};

const MyTicket = () => {
  const [datas, setDatas] = useState([]);
  const [status, setStatus] = useState([]);
  // const [dataEvent, setDataEvent] = useState([]);

  const getDataOrder = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);
      const idUser = decode.query['id_users'];
      const url = `${appConfig.apiUrl}/payment/all/orders/${idUser}`;
      const result = await axios.get(url);
      setDatas(result.data);
      setStatus(result?.data[0].status);
      // setDataEvent(result.data[0].events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataOrder();
  }, [status]);

  const data = datas.map((value) => {
    // console.log(value?.events?.id_events);
    const dataEvent = {
      src: `${appConfig.apiUrl}/upload/get/imageevent/${value?.events.banner_event}`,
      title: value?.events.nama_event,
      venue: value?.events.alamat,
      time: value?.events.waktu_event,
      date: value?.events.tanggal_event,
      href: `/invoice/${value?.events?.id_events}`,
    };
    return dataEvent;
  });
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-start gap-2">
      {status === 'Approved' ? (
        <CardEvent
          isCardEvent={data}
          onClick={(id) => {}}
          titleBtn={'CETAK TIKET'}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MyTicket;
