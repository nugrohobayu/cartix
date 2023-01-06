import React from 'react';
import {Card, Col, Breadcrumb, Tabs} from 'antd';
import DefaultLayoutCustomer from '../../../components/defaultLayoutCustomer';
import ApprovePayment from './approvePayment';
import MyTicket from './myTicket';
import HistoryEvent from './historyEvent';
import BreadcrumbView from '../../../components/breadcrumbView';
import TabView from '../../../components/tabs';
const {TabPane} = Tabs;
const onChange = (key) => {
  console.log(key);
};
const Dashboard = () => {
  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Dashboard',
      path: '/dashboard/customer',
    },
  ];
  const isTabs = [
    // {
    //   name: 'Approve Pembayaran',
    //   des: <ApprovePayment />,
    // },
    {
      name: 'Tiket Saya',
      des: <MyTicket />,
    },
    {
      name: 'Riwayat Tiket',
      des: <HistoryEvent />,
    },
  ];
  return (
    <DefaultLayoutCustomer>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />
      <TabView isTabs={isTabs} />
    </DefaultLayoutCustomer>
  );
};

export default Dashboard;
