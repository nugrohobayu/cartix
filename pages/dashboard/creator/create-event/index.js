import {
  Button,
  Option,
  Form,
  Input,
  Select,
  Upload,
  Space,
  DatePicker,
  TimePicker,
  Card,
  Row,
  Col,
  message,
} from 'antd';
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import appConfig from '../../../../config/app';
import moment from 'moment';
const {TextArea} = Input;

const CreateEventHandler = () => {
  const [path, setPath] = useState([]);
  const [fileList, setFileList] = useState([]);

  const router = useRouter();
  const {id} = router.query;
  // console.log({id});
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      message.error('Login dulu yaa!');
      router.push('/login');
    }
  });

  const uploadHandler = async (args) => {
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('file', args.file);

      const processImage = await axios
        .post(`${appConfig.apiUrl}/upload/add/banerevents`, formData, {
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
            message.success('Berhasil unggah foto');
          }
        });
    } catch (error) {
      message.error('Gagal Unggah Foto');
    }
  };

  const handlerCreateEvent = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios
        .post(
          `${appConfig.apiUrl}/event/create/${id}`,
          {
            nama_event: values.title,
            nama_penyelenggara: values.creator,
            tanggal_event: values.date._d,
            waktu_event: values.time._d,
            alamat: values.venue,
            deskripsi: values.description,
            detail: values.detail,
            banner_event: path,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          if (response.status === 201) {
            message.success('Berhasil Menambahkan Event');
            router.push(`/dashboard/creator/managementEvent/${id}`);
          }
        });
    } catch (err) {
      console.log(err);
      message.error('Gagal membuat event');
    }
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <div className="bg-slate-100 py-20 flex flex-col items-center">
      <Form onFinish={handlerCreateEvent} onFinishFailed={onFinishFailed}>
        <div className="">
          <Card
            style={{
              width: 900,
              marginBottom: 5,
            }}
            cover={
              <div className="flex justify-center ">
                <Upload
                  customRequest={uploadHandler}
                  fileList={fileList}
                  multiple={false}>
                  <div
                    className="h-96 bg-cover flex flex-col items-center justify-center rounded-t-md"
                    style={{
                      backgroundImage: 'url(../../../img/bg-tiket.jpg)',
                      width: 900,
                      //marginTop: 0,
                    }}>
                    <UploadOutlined
                      style={{
                        color: '#ffffff',
                        fontSize: '48px',
                      }}
                    />
                    <div className="text-white text-xl font-semibold">
                      unggah poster/banner
                    </div>
                    <div className="text-white text-lg font-semibold">
                      Direkomendasikan ukuran 786 x 280 dan 2MB
                    </div>
                  </div>
                </Upload>
              </div>
            }>
            <Form.Item name="title">
              <Input placeholder="Nama Event" />
            </Form.Item>
            <Form.Item name="venue">
              <Input placeholder="Venue Event" />
            </Form.Item>
            <div className="flex justify-start gap-24">
              <div className="font-semibold text-md pb-4">
                <div className="pb-4">Diselenggarakan Oleh</div>
                <Form.Item name="creator">
                  <Input placeholder="Nama Penyelenggara" />
                </Form.Item>
              </div>

              <div className="font-semibold text-md pb-2">
                <div className="pb-4">Tanggal & Waktu</div>
                <Space
                  style={{
                    display: 'flex',
                  }}
                  align="baseline">
                  <Form.Item name="time">
                    <TimePicker format={'HH:mm'} />
                  </Form.Item>
                  <Form.Item name="date">
                    <DatePicker />
                  </Form.Item>
                </Space>
              </div>
            </div>
          </Card>
        </div>

        <div className="font-semibold text-md">Deskripsi Event</div>
        <Form.Item name="description">
          <TextArea rows={8} />
        </Form.Item>

        <div className="font-semibold text-md">Syarat dan Ketentuan</div>
        <Form.Item name="detail">
          <TextArea rows={8} />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between">
            <Button type="primary" htmlType="submit">
              BUAT EVENT
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEventHandler;
