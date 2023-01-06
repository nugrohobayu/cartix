import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import BreadcrumbView from '../../../components/breadcrumbView';
import CardView from '../../../components/cardView';
import DefaultLayoutCreator from '../../../components/defaultLayoutCreator';
import appConfig from '../../../config/app';

const Dashboard = () => {
  const router = useRouter();
  const {id} = router.query;
  const [idUser, setIdUser] = useState('');
  const [countEvent, setCountEvent] = useState(0);
  const [countPayment, setCountPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const total = totalPayment.toLocaleString('id', {
    style: 'currency',
    currency: 'IDR',
  });

  const isBreadcrumb = [
    {
      name: 'Kamu Disini',
    },
    {
      name: 'Dashboard',
      path: '/dashboard/creator',
    },
  ];
  const getDataEvent = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);
      const id_user = decode.query['id_users'];
      setIdUser(id_user);

      const url = `${appConfig.apiUrl}/event/table/test/${idUser}`;
      const result = await axios.get(url);
      const countData = result?.data.length;
      setCountEvent(countData);
    } catch (error) {
      console.log(error);
    }
  };
  const countDataPayment = async () => {
    try {
      const url = `${appConfig.apiUrl}/payment/tiket/terjual`;
      const result = await axios.get(url);
      setCountPayment(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const totalPayments = async () => {
    try {
      const url = `${appConfig.apiUrl}/payment/jumlah/pembayaran`;
      const result = await axios.get(url);
      setTotalPayment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataEvent();
    countDataPayment();
    totalPayments();
  }, [idUser]);

  const datas = [
    {
      title: 'Total Event',
      name: 'Event',
      data: `${countEvent}`,
    },
    {
      title: 'Total Tiket Tejual',
      name: 'Tiket',
      data: `${countPayment}`,
    },
    {
      title: 'Total Penjualan',
      name: `${total}`,
      des: '/dashboard/creator/managementEvent',
      data: ``,
    },
  ];
  return (
    <DefaultLayoutCreator>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />

      <div style={{minHeight: '100vh'}}>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-0">
          <CardView isCard={datas}></CardView>
        </div>
      </div>
    </DefaultLayoutCreator>
  );
};
export default Dashboard;
