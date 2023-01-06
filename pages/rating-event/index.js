import {Card, Rate} from 'antd';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Footer from '../../components/landing/footer';
import Navigasi from '../../components/landing/navigasi';
import appConfig from '../../config/app';
const {Meta} = Card;

const contentStyle = {
  height: '800px',
  // minWidth: '100vw',
  background: '#F8F8F8',
};
const cardStyle = {
  width: 340,
  borderRadius: 8,
  // marginRight: 2,
  // backgroundColor: 'red',
  boxShadow: '[0, 8, 24, rgba(202, 202, 202, 0.5)]',
};
const cardImgStyle = {
  width: 340,
  height: 200,
  borderRadius: '8px 8px 0px 0px',
};
export default function Rating() {
  const [datas, setDatas] = useState([]);
  const getDataReview = async () => {
    try {
      const url = `${appConfig.apiUrl}/event/all/ulasan`;
      const result = await axios.get(url);
      const dataReview = result.data[0];
      setDatas(dataReview);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataReview();
  }, []);

  // console.log(datas);
  return (
    <>
      <Navigasi />
      {/* <div className="text-center pt-20">Rating Events</div> */}
      <div className="grid grid-cols-3 gap-4 container mb-60 pt-20">
        {datas.map((value) => {
          return (
            <Card
              hoverable
              style={cardStyle}
              cover={
                <img
                  style={cardImgStyle}
                  src={`${appConfig.apiUrl}/upload/get/imageevent/${value?.orders?.events.banner_event}`}
                />
              }>
              <Meta
                title={`${value?.orders?.events.nama_event}`}
                description={`${value?.orders?.events.nama_penyelenggara}`}
              />
              <Rate allowHalf disabled value={value?.rating} />
              <div>{value?.komentar}</div>
            </Card>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
