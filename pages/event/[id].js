import Footer from '../../components/landing/footer';
import Navigasi from '../../components/landing/navigasi';
import {
  Row,
  Col,
  Button,
  Input,
  Space,
  Card,
  Table,
  InputNumber,
  message,
  Form,
} from 'antd';
import {Container} from 'react-bootstrap';
import {ClockCircleOutlined, CalendarOutlined} from '@ant-design/icons';
import Link from 'next/link';
import appConfig from '../../config/app';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {data} from 'autoprefixer';
import jwtDecode from 'jwt-decode';
const {useRouter} = require('next/router');

const styleIcon = {
  color: '#FF7532',
  fontSize: 18,
};
const IdEvent = () => {
  const router = useRouter();
  const {id} = router.query;

  // const [count, setCount] = useState(0);
  const [datas, setDatas] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [category, setCategory] = useState([]);
  const [kuantitas, setKuantitas] = useState([]);
  const [price, setPrice] = useState([]);
  const [idUser, setIdUser] = useState([]);
  // const [idCategory, setIdCategory] = useState([]);
  // console.log(kuantitas);
  const getDataEvent = async () => {
    const url = `${appConfig.apiUrl}/event/get/${id}`;
    const result = await axios.get(url);
    const dataEvent = result.data;
    setDatas(dataEvent);
  };

  const getDataCategory = async (res) => {
    const url = `${appConfig.apiUrl}/event/kategori/by/${id}`;
    const result = await axios.get(url);
    const dataCategory = result.data[0];
    const dataQty = dataCategory;
    // console.log(dataCategory[0].id_kategori);
    // setIdCategory(dataCategory['id_kategori']);
    setIdCategory(dataCategory[0].id_kategori);
    setPrice(dataCategory[0].harga_tiket);
    setQuantity(dataQty);
    setCategory(dataCategory);
  };
  // console.log(price);

  // console.log(category?.[0].id_kategori);
  const [idCategory, setIdCategory] = useState([]);

  const orderEvent = async (values) => {
    try {
      // console.log(kuantitas);
      // console.log(idCategory);

      const token = localStorage.getItem('tokenUsers');
      const decode = jwtDecode(token);
      const idUser = decode.query.id_users;
      // console.log(decode.query.id_users);
      const url = `${appConfig.apiUrl}/payment/orders/${idUser}/${id}/${idCategory}`;

      await axios
        .post(
          url,
          {
            kuantitas: kuantitas,
            total_harga: kuantitas * price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((result) => {
          // console.log(result);
          const res = result.status;
          if (res === 201 || res === 200) {
            message.success('Berhasil Melakukan Pemesanan');
            router.push('/payment');
          } else {
            message.error('Ada yang salah');
          }
        });
    } catch (error) {
      console.log(error);
      window.alert('Anda belum login');
      router.push('/login');
    }
  };

  useEffect(() => {
    getDataEvent();
    getDataCategory();
  }, []);
  // console.log(jumlah);
  const qty = quantity.map((val) => {
    const data = {
      jumlah: val.jumlah_tiket,
    };
    return data;
  });

  const dataTable = category.map((value) => {
    const rupiah = value.harga_tiket.toLocaleString('id', {
      style: 'currency',
      currency: 'IDR',
    });
    const data = {
      kategori: value.kategori,
      harga: `${rupiah}`,
      jumlah: value.jumlah_tiket,
    };
    return data;
  });

  const col = [
    {
      title: 'Kategori',
      dataIndex: 'kategori',
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
    },

    {
      title: 'Kuantitas',
      render: (qty) => {
        return (
          <>
            <Form onFinish={orderEvent}>
              <Form.Item name="kuantitas">
                <InputNumber
                  onChange={setKuantitas}
                  defaultValue={0}
                  size="middle"
                  min={0}
                  max={qty.jumlah}
                />
              </Form.Item>
            </Form>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navigasi />
      <Container style={{minHeight: '100vh', paddingTop: 100}}>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          <div>
            <div>
              <Card
                style={{
                  width: 450,
                  borderRadius: 6,
                  marginTop: 16,
                  marginBottom: 5,
                }}
                cover={
                  <img
                    style={{
                      height: 300,
                      borderRadius: '6px 6px 0px 0px',
                    }}
                    src={`${appConfig.apiUrl}/upload/get/imageevent/${datas.banner_event}`}></img>
                }>
                <div className="text-xl font-bold  border-b-2 border-slate-200">
                  {datas.nama_event}
                </div>
                <div className="text-lg my-3 border-b-2 border-slate-200">
                  {datas.alamat}
                </div>

                <div className="flex justify-start gap-6">
                  <div className="w-48">
                    <div className="font-bold text-md py-2   ">
                      Diselenggarakan Oleh
                    </div>

                    <Space direction="horizontal">
                      {/* <div className="w-8">
                        <img src="../../../img/bg-tiket.jpg"></img>
                      </div> */}
                      <div className="text-md my-3 border-b-2 border-slate-200">
                        {datas.nama_penyelenggara}
                      </div>
                    </Space>
                  </div>

                  <div className="flex justify-start gap-6">
                    <div className="w-full">
                      <div className="font-bold text-md pt-2 pb-4">
                        Tanggal & Waktu
                      </div>

                      <div className="pb-2 ">
                        <div className="flex gap-1">
                          <div>
                            <CalendarOutlined style={styleIcon} />
                          </div>
                          <div className="text-md border-b-2 border-slate-200">
                            {datas.tanggal_event}
                          </div>

                          <div className="pl-6">
                            <ClockCircleOutlined style={styleIcon} />
                          </div>
                          <div className="text-md border-b-2 border-slate-200">
                            {datas.waktu_event?.slice(11, 16)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="text-lg font-semibold pt-2">Deskripsi Tiket</div>
            <div className="pb-4">{datas.deskripsi}</div>

            <div className="text-lg font-semibold pt-2">
              Syarat dan Ketentuan
            </div>
            <div className="pb-4">{datas.detail}</div>
          </div>

          <div className="w-96 pb-8">
            <Table
              pagination={false}
              style={{marginTop: 20}}
              columns={col}
              dataSource={dataTable}
            />
            {/* <Form onFinish={orderEvent}> */}
            {/* <Link href="/payment"> */}
            <Button
              onClick={orderEvent}
              htmlType="submit"
              type="primary"
              style={{width: '100%', fontSize: 16}}>
              Pesan Sekarang
            </Button>
            {/* </Link> */}
            {/* </Form> */}
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default IdEvent;
