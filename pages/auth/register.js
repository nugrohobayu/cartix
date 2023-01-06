import Link from 'next/link';
import appConfig from '../../config/app';
import {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {Button, Card, DatePicker, Form, Input, message, Select} from 'antd';

export default function Register() {
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [no_telepon, setTlpNumber] = useState([]);
  const [tanggal_lahir, setDate] = useState([]);
  const [jenis_kelamin, setGender] = useState([]);
  const [password, setPassword] = useState([]);

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const onChangeTlpNumber = (e) => {
    const value = e.target.value;
    setTlpNumber(value);
  };
  const onChangeDate = (e) => {
    const value = e.target.value;
    setDate(value);
  };
  const onChangeGender = (e) => {
    // console.log(e.target)
    // const value = e.target?.value;
    setGender(e);
  };
  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const router = useRouter();

  const registerSubmit = async () => {
    try {
      setUsername(username);
      setEmail(email);
      setTlpNumber(no_telepon);
      setDate(tanggal_lahir);
      setGender(jenis_kelamin);
      setPassword(password);

      const res = await axios
        .post(`${appConfig.apiUrl}/auth/register`, {
          username,
          email,
          no_telepon,
          tanggal_lahir,
          jenis_kelamin,
          password,
        })
        .then((result) => {
          if (result.data.statusCode == 201 || result.data.statusCode == 200) {
            message.success('Berhasil membuat akun');
            router.push('/login');
          } else {
            window.alert('Gagal Mendaftar');
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat w-full h-screen flex flex-col items-center justify-center"
      style={{backgroundImage: 'url(../../img/bg-tiket.jpg)'}}>
      <Card
        title="Mendaftarkan Akun"
        style={{
          width: 400,
          // height: 320,
          textAlign: 'left',
          borderRadius: 8,
        }}>
        <Form onFinish={registerSubmit}>
          <Form.Item>
            <Input
              value={username}
              onChange={onChangeUsername}
              placeholder="Nama Lengkap"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type={'email'}
              value={email}
              onChange={onChangeEmail}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={no_telepon}
              onChange={onChangeTlpNumber}
              type="number"
              placeholder="Nomor Telepon"
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={tanggal_lahir}
              onChange={onChangeDate}
              type={'date'}
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={jenis_kelamin}
              onChange={onChangeGender}
              placeholder="Pilih Jenis Kelamin">
              <Select.Option value={'laki-laki'}>Laki-laki</Select.Option>
              <Select.Option value={'perempuan'}>Perempuan</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Input
              value={password}
              onChange={onChangePassword}
              type={'password'}
              placeholder="Kata Sandi"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
                borderRadius: 4,
                marginTop: 12,
              }}>
              Daftar
            </Button>
            Sudah punya akun?
            <a className="no-underline text-left" href="/login">
              Masuk
            </a>
          </Form.Item>
        </Form>
      </Card>

      {/* <div className="logo">
        <img style={{width: '120px'}} src="./../img/logo-biru.png"></img>
      </div>
      <Container>
        <Row>
          <Col lg={6}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{height: '300px'}}>
              <img className="" width={350} src="./../img/bg-login.png"></img>
            </div>
            <div
              className="d-block mx-auto text-center"
              style={{width: '500px', color: '#838080'}}>
              <h3>Temukan dan buat event seru di CarTix</h3>
              <h4>
                Gabung dan rasakan kemudahan bertransaksi dan mengelola event di
                CartiX
              </h4>
            </div>
          </Col>

          <Col lg={6}>
            <div className="card border-light d-block mx-auto">
              <div className="text-center">
                <h3>
                  <b>Daftarkan Akunmu</b>
                </h3>
              </div>
              <div className="px-10">
                <Form onSubmit={onSubmit} className="mx-auto d-grid gap-1">
                  <Form.Group className="lg-3">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      value={username}
                      onChange={onChangeUsername}
                      type="text"
                      placeholder="Nama Lengkap (Sesuai KTP/SIM)"
                    />
                  </Form.Group>
                  <Form.Group className="lg-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={onChangeEmail}
                      type="email"
                      placeholder="Email Aktif"
                    />
                  </Form.Group>
                  <Form.Group className="lg-3">
                    <Form.Label>Nomor Telepon</Form.Label>
                    <Form.Control
                      value={no_telepon}
                      onChange={onChangeTlpNumber}
                      type="number"
                      placeholder="Masukkan Nomor Handphone Aktif"
                    />
                  </Form.Group>
                  <Form.Group className="lg-3">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      value={tanggal_lahir}
                      onChange={onChangeDate}
                      type="date"
                      placeholder="Masukkan Email"
                    />
                  </Form.Group>
                  <Form.Group className="lg-3">
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Select
                      value={jenis_kelamin}
                      onChange={onChangeGender}>
                      <option>Pilih Jenis Kelamin</option>
                      <option value={'laki-laki'}>Laki-Laki</option>
                      <option value={'perempuan'}>Perempuan</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="lg-3">
                    <Form.Label>Kata Sandi</Form.Label>
                    <Form.Control
                      value={password}
                      onChange={onChangePassword}
                      type="password"
                      placeholder="Masukkan Kata Sandi"
                    />
                  </Form.Group>

                  <div className="mt-4">
                    <button
                      onClick={registerSubmit}
                      className="bg-orange-400 rounded-r-md rounded-l-md py-1 w-full text-white gap-0">
                      DAFTAR
                    </button>
                  </div>
                </Form>
              </div>
              <div className="card-body"></div>
            </div>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}
