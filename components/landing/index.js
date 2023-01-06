import Navigasi from './navigasi';
import React from 'react';
import ListEvent from './listEvent';
import RatingEvent from './ratingEvent';
import Footer from './footer';
import About from './about';
import {Input} from 'antd';
import {SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';
import Events from './events';
import Create from './create';

const LandingPage = () => {
  return (
    <div>
      <Navigasi />
      <div
        className="bg-cover bg-no-repeat min-w-full h-80 flex flex-col items-center justify-center"
        style={{backgroundImage: ' url(./img/bg-landing2.jpg)'}}>
        <h1 className="text-white font-bold">Selamat Datang</h1>
        <h2 className="text-white font-bold">
          Temukan dan buat event seru di CarTix!
        </h2>
        {/* <Input
          style={{width: '30%', borderRadius: 20}}
          prefix={<SearchOutlined style={{color: '#7F8487'}} />}
        /> */}
      </div>

      <ListEvent />
      <Events />
      <RatingEvent />
      <Create />
      <Footer />
    </div>
  );
};

export default LandingPage;
