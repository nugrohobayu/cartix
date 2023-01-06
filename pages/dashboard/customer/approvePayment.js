import React from 'react';
import {Card, Col, Row} from 'antd';
import Link from 'next/link';
import CardEvent from '../../../components/cardEvent';
const cardStyle = {
  borderRadius: 6,
  borderColor: '#D9D9D9',
};
const ApprovePayment = () => {
  const datas = [
    {
      des: '../../img/sheila.jpg',
      onClick: '',
      href: '/event/${id}',
      title: 'Konser Sheila ON7',
      titleBtn: 'BAYAR',
      venue: 'Parkiran Utama Sumarecon Mall, Bekasi',
      time: '21:00',
      date: '20 Agustus 2022',
    },
  ];
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3  gap-6">
      <CardEvent isCardEvent={datas} />
    </div>
  );
};

export default ApprovePayment;
