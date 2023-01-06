import BreadcrumbView from '../../../../components/breadcrumbView';
import DefaultLayoutAdmin from '../../../../components/defaultLayoutAdmin';
import TableView from '../../../../components/tableView';
import {Button, Modal} from 'antd';
import Link from 'next/link';
import {InfoOutlined} from '@ant-design/icons';

const ListReport = () => {
  const isBreadcrumb = [
    {
      name: 'Kamu disini',
    },
    {
      name: 'Daftar Report',
      path: '/dashboard/creator/list-report',
    },
  ];

  const col = [
    {
      title: 'No',
      dataIndex: 'nomor',
    },
    {
      title: 'Nama Event',
      dataIndex: 'nama_event',
      sorter: (a, b) => a.nama_event - b.nama_event,
    },
    {
      title: 'Tanggal Event',
      dataIndex: 'tanggal_event',
      sorter: (a, b) => a.tanggal_event - b.tanggal_event,
    },
    {
      title: 'Lokasi',
      dataIndex: 'lokasi',
      sorter: (a, b) => a.lokasi - b.lokasi,
    },
    {
      title: 'Nama Penyelenggara',
      dataIndex: 'nama_penyelenggara',
      sorter: (a, b) => a.nama_penyelenggara - b.nama_penyelenggara,
    },

    {
      title: 'Aksi',
      render: () => {
        return (
          <div>
            <Button
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: '#3AB0FF',
                width: 24,
              }}>
              <Link href="/">
                <InfoOutlined
                  style={{
                    color: '#ffffff',
                    fontSize: '20px',
                  }}
                />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = [
    {
      nomor: 1,
      nama_event: 'KONSER SHEILA ON7',
      tanggal_event: '22 Juli 2022',
      lokasi: 'Parkiran Utama Sumarecom Mall, Bekasi',
      nama_penyelenggara: 'bayu Entertainment',
    },
  ];

  return (
    <DefaultLayoutAdmin>
      <BreadcrumbView isBreadcrumb={isBreadcrumb} />
      <TableView
        btnStyle={{
          backgroundColor: '#28A745',
          color: 'white',
          borderRadius: '4px',
        }}
        search={true}
        titleSearch={'Cari Event'}
        linkDes={true}
        hrefDes={''}
        columns={col}
        dataSource={dataSource}
      />
    </DefaultLayoutAdmin>
  );
};

export default ListReport;
