import {Card} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {Typography} from 'antd';
const {Title} = Typography;
import Link from 'next/link';

const CardView = ({isCard}) => {
  //const { isCard, cardApa } = props;
  return (
    <>
      {isCard.map((value, index) => {
        return (
          <Card
            title={
              <div className="text-2xl font-semibold text-slate-500">
                {value.title}
              </div>
            }
            // extra={
            //   <Link href={value.des}>
            //     <a>
            //       <div className=" flex items-center text-lg text-sky-500">
            //         <div>DETAIL</div>
            //         <CaretRightOutlined />
            //       </div>
            //     </a>
            //   </Link>
            // }
            // headStyle={{
            //   backgroundColor: '#3AB0FF',
            // }}
            style={{
              width: 320,
              height: 160,
              borderRadius: 6,
              borderColor: '#eeeeee',
              marginTop: 30,
              padding: '0px 20px 0px 20px',
            }}>
            <div className="flex gap-2 items-center">
              <Title style={{fontSize: '48px'}}>{value.data}</Title>
              <div className="text-xl text-slate-500">{value.name}</div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default CardView;
