import {Button, message, Upload} from 'antd';
import axios from 'axios';
import appConfig from '../config/app';
import {UploadOutlined} from '@ant-design/icons';
import {useState} from 'react';

const UploadImage = ({onChangeImage}) => {
  const uploadHandler = async (args) => {
    try {
      const formData = new FormData();
      formData.append('file', args.file);

      const processImage = await axios
        .post(`${appConfig.apiUrl}/upload/add/banerevents`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res) => {
          message.success('Berhasil Upload File');
          // console.log(res);
          // setImage(res.data.imagePath);
          onChangeImage(res.data.imagePath);
        });
    } catch (error) {
      message.error('Upload Failed');
    }
  };
  return <Upload customRequest={(args) => uploadHandler(args)}></Upload>;
};

export default UploadImage;
