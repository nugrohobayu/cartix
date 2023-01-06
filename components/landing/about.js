import {Button, Carousel} from 'antd';
import Link from 'next/link';
const contentStyle = {
  height: '150px',
  color: '#003865',
  lineHeight: '30px',
  textAlign: 'left',
};
const About = () => {
  return (
    <Carousel
      style={{background: '#DFF6FF'}}
      autoplay
      autoplaySpeed={5000}
      // dots={true}
      // dotPosition="bottom"
    >
      <div className="sm:pb-40 lg:pb-10">
        <div
          style={contentStyle}
          className="container text-lg flex flex-col pt-10 pb-40">
          <div className="text-2xl font-bold pb-2">BUAT EVENT</div>
          Buat eventmu di CarTix, dan rasakan kemudahan dalam manajemen
          pemasaran, manajemen distribusi, manajemen penjualan serta layanan
          pembelian tiket. CarTix selalu hadir dengan inovasi dan layanan yang
          bertujuan untuk mendukung penjualan tiket acara menjadi lebih baik.
          Mulai daftarkan akunmu dan buat event seru dengan klik tombol dibawah
          {/* <div>
            <Link href="/">
              <Button type="primary" style={{marginRight: '10px'}}>
                Buat Event
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button>Daftar</Button>
            </Link>
          </div> */}
        </div>
      </div>

      <div className="sm:pb-40 lg:pb-20">
        <div
          style={contentStyle}
          className="container text-lg flex flex-col  pt-10 pb-40">
          <div className="text-2xl font-bold pb-2">JELAJAH EVENT</div>
          Jelajah dan temukan event seru diCarTix. Dengan ratusan event yang
          sudah terdaftar, cari event seru yang bisa kamu temukan di CarTix dan
          temukan kemudahan dalam bertransaksi.Buat akunmu sekarang untuk bisa
          menikmati berbagai kemudahan dalam bertransaksi di CarTix, Pilih
          kategori event yang kamu suka dan beli tiket dengan klik tombol
          dibawah ini.
          {/* <div>
            <Link href="/">
              <Button type="primary" style={{marginRight: '10px'}}>
                Jelajah Event
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button>Daftar</Button>
            </Link>
          </div> */}
        </div>
      </div>
    </Carousel>
  );
};

export default About;
