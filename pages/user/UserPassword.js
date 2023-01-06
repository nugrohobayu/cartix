import {Button, Form, Input} from 'antd';

const UserPassword = () => {
  return (
    <>
      <Form>
        <Form.Item
          label="Kata Sandi Lama"
          labelCol={{
            span: 24,
          }}>
          <Input placeholder="Masukkan Kata Sandi Lama"></Input>
        </Form.Item>

        <Form.Item label="Kata Sandi Baru" labelCol={{span: 24}}>
          <Input placeholder="Masukkan Kata Sandi Baru Anda"></Input>
        </Form.Item>

        {/* <Form.Item
          label="Konfirmasi Kata Sandi Baru Anda"
          labelCol={{span: 24}}>
          <Input placeholder="Konfirmasi Kata Sandi Baru Anda"></Input>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            SIMPAN PERUBAHAN
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserPassword;
