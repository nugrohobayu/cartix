import Link from 'next/link';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import appConfig from '../../config/app';
const ListEvent = () => {
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

  return (
    <div
      style={{
        background: '#f8fafc',
      }}>
      <Container
        style={{
          paddingTop: '50px',
          paddingBottom: '24px',
        }}>
        <Row>
          <Col lg={6}>
            <div className="text-left font-bold text-2xl pb-2 text-sky-900">
              Rekomendasi Event
            </div>
            <Card
              className="shadow-md shadow-slate-400/50"
              style={{width: '100%', borderRadius: 8}}>
              <Card.Img
                style={{borderRadius: '8px 8px 0 0'}}
                variant="top"
                src={`${appConfig.apiUrl}/upload/get/imageevent/${datas[3]?.banner_event}`}
              />
              <Card.Body>
                <Card.Title className="uppercase">
                  {datas[3]?.nama_event}
                </Card.Title>
                <Card.Text>{datas[3]?.deskripsi}</Card.Text>
                <div className="">
                  <p>
                    Harga Mulai :{' '}
                    <b>
                      {datas[3]?.kategori[0]?.harga_tiket.toLocaleString('id', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </b>
                  </p>
                  <Link href={`/event/${datas[3]?.id_events}`}>
                    <button className="bg-sky-600 rounded-md py-2 w-full text-white font-semibold hover:bg-sky-500">
                      BELI
                    </button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <div className="text-left text-2xl font-bold pb-2 text-sky-900">
              Event Terbaru
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex shadow-md shadow-slate-400/50 border rounded-lg gap-2 items-center justify-between">
                <img
                  className="w-40 h-40 mx-2 my-2 rounded-md"
                  src={`${appConfig.apiUrl}/upload/get/imageevent/${datas[0]?.banner_event}`}></img>
                <div className="flex flex-col">
                  <div className="font-bold pb-2 w-full">
                    {datas[0]?.nama_event}
                  </div>
                  <div className="py-1">
                    {datas[0]?.tanggal_event}
                    {/* <span className="px-2">
                      {datas[1]?.waktu_event.slice(11, 16)}
                    </span> */}
                  </div>
                  <div className="py-1">{datas[0]?.alamat}</div>
                  <div className="pt-1 pb-2 font-bold">
                    {datas[0]?.kategori[0]?.harga_tiket.toLocaleString('id', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </div>
                </div>
                <div>
                  <Link href={`/event/${datas[0]?.id_events}`}>
                    <button className="bg-sky-600 rounded-md py-2 mr-4 text-white font-bold w-20 hover:bg-sky-500">
                      BELI
                    </button>
                  </Link>
                  <button></button>
                </div>
              </div>

              <div className="flex shadow-md shadow-slate-400/50 border rounded-lg gap-2 items-center justify-between">
                <img
                  className="w-40 h-40 mx-2 my-2 rounded-md"
                  src={`${appConfig.apiUrl}/upload/get/imageevent/${datas[1]?.banner_event}`}></img>
                <div className="flex flex-col">
                  <div className="font-bold pb-2 w-full">
                    {datas[1]?.nama_event}
                  </div>
                  <div className="py-1">
                    {datas[1]?.tanggal_event}
                    {/* <span className="px-2">
                      {datas[1]?.waktu_event.slice(11, 16)}
                    </span> */}
                  </div>
                  <div className="py-1">{datas[1]?.alamat}</div>
                  <div className="pt-1 pb-2 font-bold">
                    {datas[1]?.kategori[0]?.harga_tiket.toLocaleString('id', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </div>
                </div>
                <div>
                  <Link href={`/event/${datas[1]?.id_events}`}>
                    <button className="bg-sky-600 rounded-md py-2 mr-4 text-white font-bold w-20 hover:bg-sky-500">
                      BELI
                    </button>
                  </Link>
                  <button></button>
                </div>
              </div>

              <div className="flex shadow-md shadow-slate-400/50 border rounded-lg gap-2 items-center justify-between">
                <img
                  className="w-40 h-40 mx-2 my-2 rounded-md"
                  src={`${appConfig.apiUrl}/upload/get/imageevent/${datas[2]?.banner_event}`}></img>
                <div className="flex flex-col">
                  <div className="font-bold pb-2 w-full">
                    {datas[2]?.nama_event}
                  </div>
                  <div className="py-1">
                    {datas[2]?.tanggal_event}
                    {/* <span className="px-2">
                      {datas[1]?.waktu_event.slice(11, 16)}
                    </span> */}
                  </div>
                  <div className="py-1">{datas[2]?.alamat}</div>
                  <div className="pt-1 pb-2 font-bold">
                    {datas[2]?.kategori[0]?.harga_tiket.toLocaleString('id', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </div>
                </div>
                <div>
                  <Link href={`/event/${datas[2]?.id_events}`}>
                    <button className="bg-sky-600 rounded-md py-2 mr-4 text-white font-bold w-20 hover:bg-sky-500">
                      BELI
                    </button>
                  </Link>
                  <button></button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListEvent;
