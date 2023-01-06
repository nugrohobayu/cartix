import {Breadcrumb, Tabs} from 'antd';
import {useRouter} from 'next/router';
import BreadcrumbView from '../../../../components/breadcrumbView';
import DefaultLayoutCreator from '../../../../components/defaultLayoutCreator';
import TabView from '../../../../components/tabs';
import EventAktif from './eventAktif';
import HistoryEvent from './historyEvent';
const {TabPane} = Tabs;

const ManagementEvent = () => {
  const isTabs = [
    {
      name: 'Event Aktif',
      des: <EventAktif />,
    },
    {
      name: 'Daftar Event',
      des: <HistoryEvent />,
    },
  ];

  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Management Event',
      path: '/dashboard/creator/managementEvent',
    },
  ];

  const router = useRouter();
  const {id} = router.query;

  return (
    <DefaultLayoutCreator>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />
      <TabView isTabs={isTabs} />
    </DefaultLayoutCreator>
  );
};

export default ManagementEvent;
