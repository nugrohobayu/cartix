import {Button, Option, Form, Input, Select, Upload} from 'antd';
import {EditOutlined, LogoutOutlined} from '@ant-design/icons';

const UserProfil = () => {
  return (
    <Form>
      <Form.Item>
        <div className="mb-2">Foto Profil</div>
        <Upload>
          <img
            className="w-24 h-24 rounded-full"
            src="../../../img/avatar.png"></img>
          <p>Maksimal resolusi gambar 1MB</p>
        </Upload>
      </Form.Item>
      <Form.Item label="Nama Lengkap" labelCol={{span: 24}}>
        <Input value={'bayu'} placeholder="Masukkan Nama Lengkap"></Input>
      </Form.Item>
      <Form.Item label="Email" labelCol={{span: 24}}>
        <Input placeholder="Masukkan Email Aktif" type="email"></Input>
      </Form.Item>

      <Form.Item label="Nomor Telepon" labelCol={{span: 24}}>
        <Input placeholder="Masukkan Nomor Telepon Aktif" type="number"></Input>
      </Form.Item>
      <Form.Item label="Tanggal Lahir" labelCol={{span: 24}}>
        <Input type="date"></Input>
      </Form.Item>
      <Form.Item label="Alamat" labelCol={{span: 24}}>
        <Input placeholder="Masukkan Alamat Lengkap" type="text"></Input>
      </Form.Item>

      <Form.Item label="Jenis Kelamin" labelCol={{span: 24}}>
        <Select defaultValue="Laki-laki" className="select-after">
          <Option value="1">Laki-laki</Option>
          <Option value="2">Perempuan</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <div className="flex justify-between">
          <Button type="primary" htmlType="submit">
            SIMPAN PERUBAHAN
          </Button>
          <Button
            style={{backgroundColor: '#FF7532', color: '#ffffff'}}
            htmlType="submit">
            HAPUS AKUN
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UserProfil;
