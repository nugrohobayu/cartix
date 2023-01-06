import {useRouter} from 'next/router';
import Home from '.';
const userId = () => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <>
      <Home />
    </>
  );
};

export default userId;
