import {Button, Card, Carousel, Col, Rate, Row} from 'antd';
import Link from 'next/link';
import appConfig from '../../config/app';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
const {Meta} = Card;

function SampleNextArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#06283D',
        borderRadius: 20,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#06283D',
        borderRadius: 20,
      }}
      onClick={onClick}
    />
  );
}

const contentStyle = {
  height: '480px',
  // minWidth: '100vw',
  // background: '#DFF6FF',
  // color: 'black',
  paddingTop: 140,
  // paddingBottom: 80,
  background: '#fff',
};
const cardStyle = {
  width: 260,
  borderWidth: 2,
  borderRadius: 8,
  // marginRight: 2,
  marginLeft: 10,
  backgroundColor: '#fff',
  // boxShadow: '[0, 8, 24, rgba(202, 202, 202, 0.5)]',
};
const cardImgStyle = {
  width: 260,
  height: 120,
  borderRadius: '8px 8px 0px 0px',
};

const RatingEvent = () => {
  const [datas, setDatas] = useState([]);
  const getDataReview = async () => {
    try {
      const url = `${appConfig.apiUrl}/event/all/ulasan`;
      const result = await axios.get(url);
      const dataReview = result.data[0];
      // console.log(result);
      setDatas(dataReview);
    } catch (error) {
      console.log(error);
    }
  };

  const dataSource = datas.map((value) => {
    const data = {
      title: value?.orders.events.nama_event,
      creator: value?.orders.events.nama_penyelenggara,
      banner_event: value?.orders.events.banner_event,
      rating: value.rating,
      komentar: value.komentar,
    };
    return data;
  });

  useEffect(() => {
    getDataReview();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={contentStyle} id="rating">
      <Link href={'/rating'}>
        <a className="no-underline text-left pl-32 pb-2 text-2xl font-semibold text-sky-900">
          Rating Events
          <i className="bi bi-chevron-right font-bold text-lg"></i>
        </a>
      </Link>
      <Row>
        <div className="container mx-auto">
          <Slider
            style={{
              // width: 1200,
              paddingBottom: 10,
              color: 'black',
              // background: '#DFF6FF',
              background: '#fff',
            }}
            {...settings}>
            {/* <div className="bg-sky-500 mx-4">1</div>
          <div className="bg-sky-500">2</div>
          <div className="bg-sky-500">3</div>
          <div className="bg-sky-500">4</div> */}

            {dataSource.map((val, id) => {
              return (
                <div key={id}>
                  <Link href={'#'}>
                    <Card
                      style={cardStyle}
                      cover={
                        <img
                          style={cardImgStyle}
                          alt="example"
                          src={`${appConfig.apiUrl}/upload/get/imageevent/${val?.banner_event}`}
                        />
                      }>
                      <Meta
                        title={`${val?.title}`}
                        description={`${val?.creator}`}
                      />

                      <Rate allowHalf disabled value={val?.rating} />
                      {/* <div>{val?.komentar}</div> */}
                    </Card>
                  </Link>
                </div>
              );
            })}
          </Slider>
          {/* <Link href={'/'}>
            <a className="no-underline pl-3 text-lg">
              Lihat Semua<i className="bi bi-caret-right "></i>
            </a>
          </Link> */}
        </div>
      </Row>
    </div>
  );
};

export default RatingEvent;
