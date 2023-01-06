import {Form, Input, message, Rate, Button} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/router';
import appConfig from '../../../../config/app';
const {TextArea} = Input;
export const FormReview = (props) => {
  const {orderId} = props;
  const router = useRouter();
  const {id} = router.query;
  const submitReview = async (value) => {
    try {
      const token = localStorage.getItem('accessToken');
      const url = `${appConfig.apiUrl}/event/ulasan/${orderId}`;
      await axios
        .post(
          url,
          {
            rating: value.rating,
            komentar: value.komentar,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((result) => {
          if (result.status === 201) {
            message.success('Review berhasil dikirim');
            router.push(`/dashboard/customer`);
          } else {
            message.error('Gagal review event');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      onFinish={submitReview}
      name="basic"
      labelCol={{span: 24}}
      wrapperCol={{span: 16}}
      initialValues={{remember: true}}
      autoComplete="off">
      <Form.Item name={'rating'} label="Berikan Rating Event">
        <Rate />
      </Form.Item>
      {/* <div>order id: {orderId}</div> */}
      <Form.Item name={'komentar'} label="Masukkan Ulasan Anda">
        <TextArea rows={6} />
      </Form.Item>
      <div className="">
        <Button type="primary" htmlType="submit">
          Kirim Review
        </Button>
      </div>
    </Form>
  );
};
