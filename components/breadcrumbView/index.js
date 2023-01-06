import {Breadcrumb} from 'antd';

const BreadcrumbView = (props) => {
  const {isBreadcrumb} = props;
  return (
    <Breadcrumb separator=">" style={{padding: '20px 0px 20px 0px'}}>
      {isBreadcrumb.map((value, index) => {
        return (
          <Breadcrumb.Item
            className="no-underline"
            key={index}
            href={value.path}>
            {value.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbView;
