import {Card} from 'antd';
import axios from 'axios';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import Slider from 'react-slick';
import appConfig from '../../config/app';
const {Meta} = Card;
const cardStyle = {
  width: 260,
  height: 200,
  borderWidth: 2,
  borderRadius: 8,
  backgroundColor: '#fff',
  marginBottom: 10,
};
const cardImgStyle = {
  width: 260,
  height: 100,
  borderRadius: '8px 8px 0px 0px',
};

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: 2,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 1000,
};
const dataSource = [{}];

export default function Events() {
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
    <>
      <div className="container pt-32" id="events">
        <Link href={'/event'}>
          <a className="no-underline text-left pl-4 pb-8 text-2xl font-semibold text-sky-900">
            Jelajah Events
            <i className="bi bi-chevron-right font-bold text-lg"></i>
          </a>
        </Link>
        <div className="container mx-auto">
          <Slider
            style={{
              // width: 1200,
              paddingBottom: 30,
              color: 'black',
              // background: '#DFF6FF',
              background: '#fff',
            }}
            {...settings}>
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
                    {/* <Meta title={value.nama_event} description={value.alamat} /> */}
                  </Card>
                </Link>
              );
            })}
          </Slider>
        </div>
        {/* <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-3">
          <Card
            hoverable
            style={cardStyle}
            cover={
              <img style={cardImgStyle} alt="example" src={`./img/naif.jpg`} />
            }>
            <Meta title={`Nama Event`} description={`Lokasi`} />

          </Card>
        </div> */}
      </div>
    </>
  );
}
