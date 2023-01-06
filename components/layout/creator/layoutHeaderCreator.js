import {Layout} from 'antd';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import PopoverView from '../../popoverView';

const {Sider, Header, Content, Footer} = Layout;

const LayoutHeaderCreator = (props) => {
  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 10,
        background: '#3AB0FF',
        borderBottom: '3px solid rgba(202, 202, 202, 0.5)',
        height: 70,
      }}
      className={'flex items-center justify-between site-layout-background'}>
      {/* <div className="p"> */}

      <img className="w-28" src="../../../img/logo-putih.png"></img>
      {/* </div> */}
      <div className="pr-14">
        <PopoverView />
      </div>
    </Header>
  );
};

export default LayoutHeaderCreator;
