import {Button, Carousel} from 'antd';
import Link from 'next/link';
const contentStyle = {
  height: '200px',
  color: '#003865',
  lineHeight: '30px',
  textAlign: 'left',
};

export default function Create() {
  return (
    <>
      <div
        id="create"
        className="container grid lg:grid-cols-2 sm:grid-cols-1 items-center py-40">
        <div className="flex flex-col">
          <div className="text-5xl font-medium">BUAT EVENT!</div>
          <div className="text-xl font-normal w-4/5">
            Daftar sebagai creator dan kamu bisa membuat event serumu sendiri,
            klik tombol dibawah!
          </div>
          {/* <Button type="primary">Buat Event</Button> */}
          <Link href={'/'}>
            <a className="no-underline bg-sky-500 text-white text-center w-1/4 my-2 py-2 rounded-md">
              Mulai
            </a>
          </Link>
        </div>
        <img style={{borderRadius: 0}} src="./img/create-event.jpg" />
      </div>
    </>
  );
}
