import {useRouter} from 'next/router';
import {useEffect} from 'react';
import LayoutMainCreator from './layout/creator/layoutMainCreator';

const DefaultLayoutCreator = (props) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('tokenUsers');

    if (!token) {
      router.push('/');
    }
  });
  return <LayoutMainCreator {...props} />;
};

export default DefaultLayoutCreator;
