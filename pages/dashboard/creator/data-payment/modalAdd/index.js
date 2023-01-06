import {Button, Modal, Table, Form, Input, InputNumber, message} from 'antd';
import {useState} from 'react';
import {useRouter} from 'next/router';
import appConfig from '../../../../../config/app';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const ModalAdd = () => {
  const router = useRouter();
  const {id} = router.query;
  // console.log(id);

  const submitBank = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');

      await axios
        .post(
          `${appConfig.apiUrl}/payment/bankPenyelenggara/${id}`,
          {
            nama_bank: values.namaBank,
            bank_akun: values.bankAkun,
            atas_nama: values.atasNama,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((result) => {
          // console.log(result);

          if (result.data.statusCode == 201 || result.data.statusCode == 200) {
            message.success('Berhasil Menambahkan Data Bank');
            router.push(`/dashboard/creator/data-payment`);
          } else {
            message.error('Gagal Menambahkan Daftar Bank');
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
    <>
      <Form
        onFinish={submitBank}
        onFinishFailed={onFinishFailed}
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        autoComplete="off">
        <Form.Item label="Nama Bank" name="namaBank">
          <Input />
        </Form.Item>

        <Form.Item label="Nama Pemilik" name="atasNama">
          <Input />
        </Form.Item>

        <Form.Item label="Nomor Rekening" name="bankAkun">
          <Input style={{width: '100%'}} />
        </Form.Item>

        <div className="pl-32">
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ModalAdd;
