import {useEffect} from 'react';
import {useRouter} from 'next/router';

import LayoutMainAdmin from './layout/admin/layoutMainAdmin';

const DefaultLayoutAdmin = (props) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    if (!token) {
      window.alert('Anda Harus Login Sebagai Admin');
      router.push('/');
    }
  }, []);
  return <LayoutMainAdmin {...props} className="bg-sky-500" />;
};

export default DefaultLayoutAdmin;
