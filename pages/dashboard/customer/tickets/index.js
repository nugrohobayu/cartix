import BreadcrumbView from '../../../../components/breadcrumbView';
import DefaultLayoutCustomer from '../../../../components/defaultLayoutCustomer';
import TabView from '../../../../components/tabs';
import MyTicket from '../myTicket';
import HistoryEvent from '../historyEvent';
import Cart from '../cart';

const Tickets = () => {
  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Daftar Tiket',
      path: '/dashboard/customer/tickets',
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
    {
      name: 'Keranjang Tiket',
      des: <Cart />,
    },
  ];
  return (
    <DefaultLayoutCustomer>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />
      <TabView isTabs={isTabs} />
    </DefaultLayoutCustomer>
  );
};

export default Tickets;
