import DefaultLayoutCreator from '../../../../components/defaultLayoutCreator';
import {Breadcrumb, Tabs} from 'antd';
import TabView from '../../../../components/tabs';
import ListPayment from './listPayment';
import BreadcrumbView from '../../../../components/breadcrumbView';
import {useRouter} from 'next/router';
import DataBank from './dataBank';
const {TabPane} = Tabs;
const DataPayment = () => {
  const isTabs = [
    {
      name: 'Data Pembayaran',
      des: <ListPayment />,
    },
    {
      name: 'Data Bank',
      des: <DataBank />,
    },
  ];
  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Data Pembayaran',
      path: '/dashboard/creator/data-payment',
    },
  ];

  const router = useRouter();
  const {id} = router.query;
  return (
    <>
      <DefaultLayoutCreator>
        <BreadcrumbView isBreadcrumb={isBreadcrumb} />
        <TabView isTabs={isTabs} />
      </DefaultLayoutCreator>
    </>
  );
};

export default DataPayment;
