import {Card, Rate} from 'antd';
import axios from 'axios';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import Navigasi from '../../components/landing/navigasi';
import appConfig from '../../config/app';
const {Meta} = Card;
const cardStyle = {
  width: 260,
  borderWidth: 2,
  borderRadius: 8,
  // marginRight: 2,
  marginLeft: 10,
  marginBottom: 10,
  backgroundColor: '#fff',
  // boxShadow: '[0, 8, 24, rgba(202, 202, 202, 0.5)]',
};
const cardImgStyle = {
  width: 260,
  height: 120,
  borderRadius: '8px 8px 0px 0px',
};

const Rating = () => {
  const [datas, setDatas] = useState([]);

  const getDataReview = async () => {
    const url = `${appConfig.apiUrl}/event/all/ulasan`;
    const result = await axios.get(url);
    const dataReview = result.data[0];
    setDatas(dataReview);
  };

  useEffect(() => {
    getDataReview();
  }, []);
  return (
    <>
      <Navigasi />
      <div className="min-h-screen container pt-28">
        <div className="text-xl font-bold text-sky-900 pb-4">Daftar Rating</div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2">
          {datas.map((val, id) => {
            return (
              <Link href={`#`}>
                <Card
                  hoverable
                  key={id}
                  style={cardStyle}
                  cover={
                    <img
                      style={cardImgStyle}
                      alt="example"
                      src={`${appConfig.apiUrl}/upload/get/imageevent/${val?.orders.events.banner_event}`}
                    />
                  }>
                  <Meta
                    title={`${val?.orders.events.nama_event}`}
                    description={`${val?.orders.events.nama_penyelenggara}`}
                  />

                  <Rate allowHalf disabled value={val?.rating} />
                  {/* <div>{val?.komentar}</div> */}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rating;
