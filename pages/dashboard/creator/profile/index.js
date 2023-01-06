import {useRouter} from 'next/router';
import BreadcrumbView from '../../../../components/breadcrumbView';
import DefaultLayoutCreator from '../../../../components/defaultLayoutCreator';
import Profil from '../../../user';

const ProfileCreator = () => {
  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Profil Saya',
      path: '/dashboard/creator/profile',
    },
  ];

  const router = useRouter();
  const {id} = router.query;
  return (
    <>
      <DefaultLayoutCreator>
        <BreadcrumbView isBreadcrumb={isBreadcrumb} />
        <Profil />
      </DefaultLayoutCreator>
    </>
  );
};

export default ProfileCreator;
