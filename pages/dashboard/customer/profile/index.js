import {useRouter} from 'next/router';
import BreadcrumbView from '../../../../components/breadcrumbView';
import DefaultLayoutCustomer from '../../../../components/defaultLayoutCustomer';
import Profil from '../../../user';

const ProfileCustomer = () => {
  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Profil Saya',
      path: '/dashboard/customer/profile',
    },
  ];

  const router = useRouter();
  const {id} = router.query;
  return (
    <>
      <DefaultLayoutCustomer>
        <BreadcrumbView isBreadcrumb={isBreadcrumb} />
        <Profil />
      </DefaultLayoutCustomer>
    </>
  );
};

export default ProfileCustomer;
