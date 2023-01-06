import {Button, Table, Input, Space, Tag} from 'antd';
import Link from 'next/link';
const {Search} = Input;

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const TableView = (props) => {
  const {
    dataSource,
    columns,
    titleButton,
    titleSearch,
    search,
    btnStyle,
    linkDes,
    hrefDes,
    onClick,
    pagination,
  } = props;

  return (
    <div className="pt-2">
      <Space
        style={{
          marginBottom: 16,
        }}>
        {search && <Search placeholder={titleSearch}></Search>}
        {linkDes && (
          <Link href={hrefDes}>
            <Button style={btnStyle} onClick={onClick}>
              {titleButton}
            </Button>
          </Link>
        )}
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      />
    </div>
  );
};

export default TableView;
