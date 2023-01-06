import {
  WhatsAppOutlined,
  LogoutOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <div className="bg-sky-500">
      <div className="container grid justify-between gap-4 lg:grid-cols-3 sm:grid-cols-1 text-white text-lg pt-6 pb-20 ">
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold pb-8">Bantuan</div>
          <div>Hubungi Kami</div>
          <div>Daftarkan Acara Kamu</div>
          <div>Kebijakan Privasi</div>
          <div>Syarat Ketentuan</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold pb-8">CarTix</div>
          <div>Tentang CarTix</div>
          <div>Produk & Layanan</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold pb-8">Kontak kami</div>
          <div className="flex gap-14">
            <div>
              {/* <FacebookOutlined style={{fontSize: '32px'}} /> */}
              <i className="bi bi-facebook text-3xl"></i>
            </div>
            <div>
              {/* <InstagramOutlined style={{fontSize: '32px'}} /> */}
              <i className="bi bi-whatsapp text-3xl"></i>
            </div>
            <div>
              {/* <WhatsAppOutlined style={{fontSize: '28px'}} /> */}
              <i className="bi bi-instagram text-3xl"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sky-700/75 text-white font-medium flex justify-center gap-2">
        <div className="text-sm py-4">Tentang Kami .</div>
        <div className="text-sm py-4">Kebijakan Privasi .</div>
        <div className="text-sm py-4">Panduan . </div>
        <div className="text-sm py-4">Hubungi Kami . </div>
        <div className="text-sm py-4">Pengaturan</div>
      </div>
    </div>
  );
};

export default Footer;
