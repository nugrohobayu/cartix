import axios from 'axios';
import {useEffect, useState} from 'react';
import BreadcrumbView from '../../../components/breadcrumbView';
import CardView from '../../../components/cardView';
import DefaultLayoutAdmin from '../../../components/defaultLayoutAdmin';
import appConfig from '../../../config/app';

const Dashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const total_payment = totalPayment.toLocaleString('id', {
    style: 'currency',
    currency: 'IDR',
  });

  const totalEvent = async () => {
    try {
      const url = `${appConfig.apiUrl}/event/count/all`;
      const result = await axios.get(url);
      setTotalEvents(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Transaksi = async () => {
    try {
      const result = await axios.get(
        `${appConfig.apiUrl}/payment/tiket/terjual`,
      );
      setTotalTransaksi(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPayments = async () => {
    try {
      const result = await axios.get(
        `${appConfig.apiUrl}/payment/jumlah/pembayaran`,
      );
      setTotalPayment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    totalEvent();
    Transaksi();
    totalPayments();
  }, []);

  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Dashboard',
      path: '/dashboard/admin',
    },
  ];

  const datas = [
    {
      title: 'Total Event',
      name: 'Event',
      data: `${totalEvents}`, //DIKASIH VALUE DARI DATABASE
    },
    {
      title: 'Total Tiket',
      name: 'Tiket',
      data: `${totalTransaksi}`, //DIKASIH VALUE DARI DATABASE
    },
    {
      title: 'Total Transaksi',
      name: `${total_payment}`,
      des: '/dashboard/creator/managementEvent',
      // data: '20', //DIKASIH VALUE DARI DATABASE
    },
  ];
  return (
    <DefaultLayoutAdmin>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />

      <div style={{minHeight: '100vh'}}>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3">
          <CardView isCard={datas} />
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
};

export default Dashboard;
