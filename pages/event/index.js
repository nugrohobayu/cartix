import {ClockCircleOutlined, CalendarOutlined} from '@ant-design/icons';
import Footer from '../../components/landing/footer';
import Navigasi from '../../components/landing/navigasi';
import CardEvent from '../../components/cardEvent';
import {useEffect, useState} from 'react';
import appConfig from '../../config/app';
import axios from 'axios';
import Link from 'next/link';
import {Card} from 'antd';

const cardStyle = {
  width: 260,
  height: 220,
  borderWidth: 2,
  borderRadius: 8,
  backgroundColor: '#fff',
  marginBottom: 10,
};
const cardImgStyle = {
  width: 280,
  height: 120,
  borderRadius: '8px 8px 0px 0px',
};

const Event = () => {
  const [datas, setDatas] = useState([]);

  const getDataEvent = async () => {
    const url = `${appConfig.apiUrl}/event`;
    const result = await axios.get(url);
    const dataEvent = result.data[0];
    setDatas(dataEvent);
  };

  useEffect(() => {
    getDataEvent();
  }, []);

  const temp = datas.map((value) => {
    const harga = value?.kategori[0]?.harga_tiket.toLocaleString('id', {
      style: 'currency',
      currency: 'IDR',
    });
    const data = {
      src: `${appConfig.apiUrl}/upload/get/imageevent/${value.banner_event}`,
      id: value.id_events,
      title: value.nama_event,
      venue: value.alamat,
      time: value.waktu_event,
      date: value.tanggal_event,
      price: `${harga}`,
      href: `/event/${value.id_events}`,
    };
    return data;
  });

  return (
    <>
      <Navigasi />
      <div className="container min-h-screen pt-24">
        <div className="pt-4 pb-2 text-2xl font-bold text-sky-900">
          Daftar Events
        </div>
        <div className="grid justify-start lg:grid-cols-4 sm:grid-cols-2">
          {/* <CardEvent
            isCardEvent={temp}
            // price={'10000'}
            onClick={(id) => {}}
            titleBtn={'BELI'}
          /> */}
          {datas.map((value, id) => {
            return (
              <Link href={`/event/${value.id_events}`}>
                <Card
                  key={id}
                  hoverable
                  style={cardStyle}
                  cover={
                    <img
                      style={cardImgStyle}
                      alt="example"
                      src={`${appConfig.apiUrl}/upload/get/imageevent/${value.banner_event}`}
                    />
                  }>
                  <div className="">
                    <div className="font-semibold">{value.nama_event}</div>
                    <div className="text-slate-600 ">{value.alamat}</div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Event;
