import {Button, Col, message, Row} from 'antd';
import {PhoneTwoTone} from '@ant-design/icons';
import {useReactToPrint} from 'react-to-print';
import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import appConfig from '../../config/app';
import axios from 'axios';

export default function Invoice() {
  const router = useRouter();
  const {id} = router.query;
  const [datas, setDatas] = useState([]);
  const [validasi, setValidasi] = useState([]);

  const componentRef = useRef();
  const handlerPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Invoice',
    // onAfterPrint: (a) => message.success('Print Success'),
  });

  const dataTiket = async () => {
    try {
      const url = `${appConfig.apiUrl}/payment/orders/events/${id}`;
      const result = await axios.get(url);
      setDatas(result?.data[0]);
      setValidasi(result?.data[0].validasi[0]);
    } catch (error) {
      console.log(error);
    }
  };
  // const harga = datas.totalHarga;

  useEffect(() => {
    dataTiket();
  }, []);
  // const id_payment = datas?.validasi[0];

  console.log(validasi);

  return (
    <div>
      <div className="bg-slate-300 h-12">
        <div className="flex justify-start container py-2">
          <div className="text-bold text-white pl-24">E-Ticket</div>
          <Button
            style={{marginLeft: 200}}
            type="primary"
            onClick={handlerPrint}>
            Print
          </Button>
        </div>
      </div>

      <Row>
        <Col ref={componentRef} span={12} offset={6}>
          <div className="pt-14">
            <div
              className="border-t-8 border-sky-500 "
              style={{backgroundImage: ' url(../../img/dimension.png)'}}>
              <div className="flex flex-row pl-2">
                <div className="basis-1/4 flex flex-col">
                  <div>Nama Pembeli</div>
                  <div>Email</div>
                  <div>Nomor Telepon</div>
                </div>
                <div className="flex flex-col w-80  font-bold">
                  <div>: {datas?.namaPembeli}</div>
                  <div>: {datas?.emailPembeli}</div>
                  <div>: {datas?.nomorTlp}</div>
                </div>

                <div className="basis-1/2 flex flex-col pl-10">
                  <img
                    style={{
                      width: 60,
                      paddingTop: 4,
                      // paddingLeft: 8,
                    }}
                    src={`${appConfig.apiUrl}/upload/get/imageevent/${datas?.fotoEvents}`}
                  />
                  <div>{datas?.namaEvents}</div>
                </div>
              </div>

              <div className="flex flex-row pb-2 border-b-8 border-sky-500">
                <div className="basis-1/4 flex flex-col pl-2 ">
                  <div>Nama Creator</div>
                  <div>Tanggal Event</div>
                  <div>Venue</div>
                </div>
                <div className="w-80 flex flex-col font-bold">
                  <div>: {datas?.namaPenyelenggara}</div>
                  <div>: {datas?.tanggalEvents}</div>
                  <div>: {datas?.alamatEvents}</div>
                </div>
                <div className="basis-1/2 flex flex-col pl-10">
                  <div className="pl-4 font-semibold">
                    {validasi.slice(24, 30)}
                  </div>

                  <div>
                    {datas?.kategori} <span>({datas?.kuantitas} Tiket)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
