import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import Footer from '../../components/landing/footer';
import Navigasi from '../../components/landing/navigasi';
import moment from 'moment';
import localization from 'moment/locale/id';
import Countdown from 'react-countdown';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import axios from 'axios';
import appConfig from '../../config/app';
import {Router, useRouter} from 'next/router';
import jwtDecode from 'jwt-decode';
const Payment = () => {
  const router = useRouter();
  const [path, setPath] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [datas, setDatas] = useState([]);
  const [idUser, setIdUser] = useState('');
  const [lastIdOrder, setLastIdOrder] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [idBank, setIdBank] = useState([]);

  const getDataOrder = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);
      const id_user = decode.query['id_users'];

      const url = `${appConfig.apiUrl}/payment/get/orders/${id_user}`;
      const result = await axios.get(url);
      const dataOrder = result.data[0];
      const count = dataOrder.length - 1;
      const getLastOrder = dataOrder[count];
      const lastIdOrders = getLastOrder?.id_orders;
      setLastIdOrder(lastIdOrders);
      setDataOrder(getLastOrder);
      setIdUser(id_user);

      // console.log(getLastOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadHandler = async (args) => {
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('file', args.file);

      const processImage = await axios
        .post(`${appConfig.apiUrl}/upload/add/buktiPembayaran`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((respon) => {
          setFileList([
            {
              path: respon.data.imagePath,
              status: 'done',
              name: 'Foto berhasil diunggah',
            },
          ]);
          setPath(respon.data.imagePath);
          if (respon.status === 201) {
            message.success('Berhasil unggah bukti transfer', 10);
          }
        });
    } catch (error) {
      message.error('Gagal unggah bukti transfer');
    }
  };

  const handlerPayment = async (values) => {
    try {
      const token = localStorage.getItem('tokenUsers');
      await axios
        .post(
          `${appConfig.apiUrl}/payment/pembayaran/${lastIdOrder}`,
          {
            nama_pengirim: values.name,
            nominal: values.nominal,
            // waktu_pembayaran: values.waktu_pembayaran,
            bukti_pembayaran: path,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 201 || res.status === 200) {
            message.success('Pembayaran Berhasil');
            router.push(`/dashboard/customer/${idUser}`);
          }
        });
    } catch (error) {
      console.log(error);
      message.error('Pembayaran Gagal');
    }
  };

  const getDataBank = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decode = jwtDecode(token);
      const id_user = decode.query['id_users'];
      const url = `${appConfig.apiUrl}/payment/getby/${id_user}`;
      const result = await axios.get(url);
      const dataBank = result.data[0];
      // console.log(dataBank);
      const idBanks = dataBank[0]?.id_bank_penyelenggara;
      setIdBank(idBanks);

      setDatas(dataBank);
    } catch (error) {
      console.log(error);
    }
  };

  // const getDataUser = async () => {
  //   try {
  //     const token = localStorage.getItem('accessToken');
  //     const decode = jwtDecode(token);
  //     const id_user = decode.query['id_users'];

  //     const url = `${appConfig.apiUrl}/users/${id_user}`;
  //     const result = await axios.get(url);
  //     const dataUser = result.data.data;
  //     setDataUser(dataUser);
  //   } catch (error) {}
  // };

  // console.log(lastIdOrder);

  // console.log(dataOrder);
  const [harga, setHarga] = useState('');

  useEffect(() => {
    getDataOrder();
    // getDataUser();
    getDataBank();
    setHarga(
      dataOrder?.total_harga?.toLocaleString('id', {
        style: 'currency',
        currency: 'IDR',
      }),
    );
  }, [lastIdOrder]);

  const renderer = ({hours, minutes, seconds, completed}) => {
    if (completed) {
      return (
        <div>
          <h3>Waktu Pemesanan Habis</h3>
        </div>
      );
    } else {
      return (
        <span className="text-orange-400 text-xl font-bold ">
          {hours}:{minutes}:{seconds}
          <div className="text-sm"> Waktu tersisa untuk memesan tiket</div>
        </span>
      );
    }
  };
  return (
    <>
      <Navigasi />
      <div className="container min-h-screen pt-20 grid grid-cols-2 gap-2">
        <div className="pl-20">
          <div
            style={{
              width: 500,
              height: 50,
              textAlign: 'center',
              alignItems: 'center',
              backgroundColor: '#D9D9D9',
            }}>
            <Countdown date={Date.now() + 7200000} renderer={renderer} />
          </div>

          <Card
            title={<div className="text-xl font-bold">Rincian Pemesanan</div>}
            style={{
              width: 500,
              textAlign: 'center',
            }}>
            <div className="text-left text-md font-semibold w-full ">
              <table style={{width: '80%'}}>
                <tr>
                  <td> Nomor Pemesanan </td>
                  <td>: {dataOrder?.id_orders}</td>
                </tr>
                {/* <tr>
                  <td> Waktu Pemesanan </td>
                  <td>: {dataOrder?.waktu_pemesanan}</td>
                </tr> */}

                <tr>
                  <td> Jumlah Tiket </td>
                  <td>: {dataOrder?.kuantitas}</td>
                </tr>
                <tr className="font-bold">
                  <td> Total Bayar </td>
                  <td>: {harga}</td>
                </tr>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <Card
            title={<div className="text-xl font-bold">Pembayaran</div>}
            style={{
              width: 500,
              textAlign: 'center',
            }}>
            <div className="text-left text-sm font-semibold w-full">
              {datas.map((values) => {
                return (
                  <>
                    <table>
                      <tr>
                        <td>Nama Bank </td>
                        <td>: {values.nama_bank} </td>
                      </tr>
                      <tr>
                        <td>Nama Pemilik</td>
                        <td>: {values.atas_nama}</td>
                      </tr>
                      <tr>
                        <td>Nomor Rekening</td>
                        <td>: {values.bank_akun}</td>
                      </tr>
                    </table>
                    <hr />
                  </>
                );
              })}
            </div>
            <Form onFinish={handlerPayment} labelCol={{span: 24}}>
              <div className="font-semibold pb-2">Masukkan Data Pemesanan</div>
              <Form.Item name="name">
                <Input placeholder="Nama Lengkap" />
              </Form.Item>
              <Form.Item name="nominal">
                <Input
                  type={'number'}
                  defaultValue={dataOrder[0]?.total_harga}
                  style={{width: '100%'}}
                  placeholder="Nomor Telepon"
                />
              </Form.Item>
              {/* <Form.Item label="Bukti Transfer"> */}
              <div className=" text-left pb-4">
                <Upload
                  customRequest={uploadHandler}
                  fileList={fileList}
                  multiple={false}>
                  <Button icon={<UploadOutlined />}>
                    Upload Bukti Transfer
                  </Button>
                </Upload>
              </div>
              {/* </Form.Item> */}
              {/* <div> */}
              <Button
                htmlType="submit"
                style={{
                  width: '100%',
                  height: 40,
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#FF7532',
                }}>
                BAYAR
              </Button>
              {/* </div> */}
            </Form>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
