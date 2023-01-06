import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import LayoutMainCustomer from './layout/customer/layoutMainCustomer';

const DefaultLayoutCustomer = (props) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('tokenUsers');
    if (!token) {
      router.push('/');
    }
  });
  return <LayoutMainCustomer {...props} className="bg-sky-500" />;
};

export default DefaultLayoutCustomer;
