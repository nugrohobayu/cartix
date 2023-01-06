import {Form, Input, Button, message} from 'antd';
import {useRouter} from 'next/router';
import appConfig from '../../../../../config/app';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function AddCategory() {
  const router = useRouter();
  const {id} = router.query;
  // console.log(id);

  const handlerCreateCategory = async (values) => {
    // console.log(values);
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);
      const idUser = decode.query['id_users'];

      const url = `${appConfig.apiUrl}/event/kategori/${id}`;
      await axios
        .post(
          url,
          {
            kategori: values.category,
            harga_tiket: values.price,
            jumlah_tiket: values.total,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          console.log(res);
          const result = res.status;
          if (result === 201 || result === 204) {
            message.success('Berhasil Menambahkan Kategori');
            router.push(`/dashboard/creator/managementEvent/`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <Form
      onFinish={handlerCreateCategory}
      onFinishFailed={onFinishFailed}
      labelCol={{span: 24}}
      wrapperCol={{span: 16}}>
      <Form.Item label="Kategori Tiket" name="category">
        <Input placeholder="Reguler/VIP/VVIP" />
      </Form.Item>
      <Form.Item label="Harga Tiket" name="price">
        <Input placeholder="Harga" />
      </Form.Item>
      <Form.Item label="Jumlah Tiket" name="total">
        <Input placeholder="Jumlah" />
      </Form.Item>
      <div className="">
        <Button type="primary" htmlType="submit">
          Simpan
        </Button>
      </div>
    </Form>
  );
}
