import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/router';
import appConfig from '../../config/app';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {message, Form, Input, Button, Card} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

export default function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const router = useRouter();
  const loginSubmit = async () => {
    try {
      const formData = {
        username: username,
        password: password,
      };

      await axios
        .post(`${appConfig.apiUrl}/auth/login`, formData, {
          headers: {'content-type': 'application/json'},
        })
        .then((result) => {
          // console.log(result);
          const jwtToken = result.data.accessToken;
          localStorage.setItem('accessToken', jwtToken);
          const decode = jwtDecode(jwtToken);

          const role = decode.query.role['role_name'];

          if (role === 'admin') {
            message.success('Anda Masuk Sebagai Admin', 5);
            localStorage.setItem('tokenAdmin', result.data.accessToken);
            router.push('../dashboard/admin');
          } else if (role === 'user') {
            message.success('Selamat Datang', 3);
            localStorage.setItem('tokenUsers', result.data.accessToken);
            router.push(`/`);
          } else {
            window.alert('Gagal Login');
          }
        });
    } catch (error) {
      message.error('Username & Password Salah', 5);
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="bg-cover bg-no-repeat w-full h-screen flex flex-col items-center justify-center"
        style={{backgroundImage: 'url(../../img/bg-tiket.jpg)'}}>
        <Card
          title="Selamat Datang"
          style={{
            width: 290,
            height: 320,
            textAlign: 'center',
            borderRadius: 8,
          }}>
          <Form onSubmit={onSubmit}>
            <Form.Item name={'username'}>
              <Input
                value={username}
                onChange={onChangeUsername}
                type={'text'}
                style={{marginTop: 10}}
                prefix={<UserOutlined />}
                placeholder="Masukkan nama"
              />
            </Form.Item>
            <Form.Item name={'password'}>
              <Input.Password
                value={password}
                onChange={onChangePassword}
                type={'password'}
                style={{marginTop: 8}}
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={loginSubmit}
                type="primary"
                htmlType="submit"
                style={{width: '100%', borderRadius: 4, marginTop: 12}}>
                Masuk
              </Button>
              Belum punya akun?
              <a className="no-underline text-left" href="/auth/register">
                Daftar
              </a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
