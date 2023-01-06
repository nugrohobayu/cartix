import {Layout} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const LayoutFooter = () => {
  return (
    <Footer
      style={{
        background: '#eeeeee',
        textAlign: 'right',
        height: '8px',
        color: '#838080',
        //position: "fixed",
      }}>
      <div className="font-bold">
        ©2022 CarTix. Segala Hak Cipta Dilindungi.
      </div>
    </Footer>
  );
};

export default LayoutFooter;
