import {Container, Nav, Navbar, Form, InputGroup} from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useEffect, useState} from 'react';
import {PopoverLanding} from '../popoverLanding';
import {Input} from 'antd';
import {SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';
import appConfig from '../../config/app';

export default function Navigasi() {
  const [username, setUsername] = useState('');
  const [idUser, setIdUser] = useState('');
  const [dropDown, setDropDown] = useState('hidden');
  const [dataEvent, setDataEvent] = useState([]);
  const [titleEvent, setTitleEvent] = useState([]);

  const getData = () => {
    try {
      const jwtToken = localStorage.getItem('accessToken');
      const decode = jwtDecode(jwtToken);

      const id = decode.query['id_users'];
      const url = `http://localhost:3222/users/${id}`;

      axios.get(url).then((datas) => {
        // console.log(datas.data.data);
        const dataUser = datas.data.data;
        setUsername(dataUser.username);
        setIdUser(dataUser['id_users']);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchEvent = async (value) => {
    // console.log(value.target.value);
    const titleEvents = value.target.value;
    setTitleEvent(titleEvents);
    try {
      const url = `${appConfig.apiUrl}/event/${titleEvent}`;
      await axios.get(url).then((response) => {
        setDataEvent(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (titleEvent === null) {
    setDropDown('hidden');
  }

  useEffect(() => {
    getData();
  }, []);
  // console.log(titleEvent);

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        className={'bg-slate-50 z-30 shadow-sm shadow-sky-400/100'}>
        <Container>
          <Navbar.Brand href="/">
            <img className="w-32 my-3 mr-2" src="../../img/logo-biru.png"></img>
            {/* <div className="text-sky-400 text-3xl font-bold">cartix</div> */}
          </Navbar.Brand>

          <Navbar.Toggle
            className=" my-2"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <div className="relative">
                <div className="absolute right-2 z-40 cursor-pointer">
                  <span
                    className={dropDown}
                    onClick={() => {
                      setDropDown('hidden');
                    }}>
                    <CloseCircleOutlined style={{color: '#94a3b8'}} />
                  </span>
                </div>

                <Form onChange={searchEvent}>
                  <Input
                    onChange={() => {
                      setDropDown('block');
                      // setTitleEvent();
                    }}
                    placeholder={`Cari event seru`}
                    style={{
                      width: 300,
                      borderRadius: 12,
                      borderColor: '#47B5FF',
                      // backgroundColor: '#DFF6FF',
                    }}
                    prefix={<SearchOutlined style={{color: '#bbb'}} />}
                  />
                </Form>
              </div>
            </Nav>
            <div className="navbar-nav">
              <div className="nav-item my-2">
                <i className="bi bi-compass text-sky-700 text-xl font-bold"></i>
                <Link href="#events">
                  <a className="no-underline py-2 px-1 text-sky-500 text-sm font-semibold hover:text-sky-700 ">
                    Events
                  </a>
                </Link>
              </div>
              <div className="nav-item lg:mx-6 sm:mx-0 my-2">
                <i className="bi bi-asterisk text-sky-700 text-lg font-bold"></i>
                <Link href="#rating">
                  <a className="no-underline text-sky-500 py-2 px-1 text-sm font-semibold hover:text-sky-700 ">
                    Rating
                  </a>
                </Link>
              </div>
              <div className="nav-item lg:mr-4 sm:mx-0 my-2">
                <i className="bi bi-window-plus text-sky-700 text-xl font-bold"></i>
                <Link href={`/dashboard/creator/create-event/${idUser}`}>
                  <a className="no-underline text-sky-500 py-2 px-1 text-sm font-semibold hover:text-sky-700 ">
                    Buat Event
                  </a>
                </Link>
              </div>

              <div className="nav-item flex sm:py-4 lg:py-0 ">
                {username ? (
                  <PopoverLanding />
                ) : (
                  <>
                    <div className="nav-item lg:mr-0 lg:ml-4 sm:ml-0 sm:mr-2 my-2">
                      <Link href="/login">
                        <a className="no-underline text-sky-500 border-1 border-sky-400 font-semibold rounded-md mt-4 py-2 px-3 hover:text-sky-700 hover:border-sky-600">
                          Daftar
                        </a>
                      </Link>
                    </div>
                    <div className="nav-item lg:ml-2 sm:ml-0 my-2">
                      <Link href="/login">
                        <a className="no-underline text-white bg-sky-400 font-semibold rounded-md mt-4 py-2 px-3 hover:bg-sky-700 ">
                          Masuk
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="absolute left-[270px] z-40 top-14 w-1/4 ">
        <div className={dropDown}>
          <div className="bg-white py-4 px-4 rounded-sm shadow-lg shadow-cyan-500/50 ">
            {dataEvent?.map((value) => {
              return (
                <>
                  <Link href={`/event/${value?.id_events}`}>
                    <div className="flex cursor-pointer pb-4  ">
                      <img
                        style={{width: 60}}
                        src={`${appConfig.apiUrl}/upload/get/imageevent/${value?.banner_event}`}
                      />
                      <div className="flex flex-col pl-4">
                        <span>{value?.nama_event}</span>
                        <span className="text-xs text-slate-500">
                          {value?.tanggal_event}
                        </span>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
