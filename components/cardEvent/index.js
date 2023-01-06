import {Button, Card, Space} from 'antd';
import Link from 'next/link';
import {ClockCircleOutlined, CalendarOutlined} from '@ant-design/icons';

const styleIcon = {
  color: '#FF7532',
  fontSize: 18,
};
const CardEvent = (props) => {
  const {isCardEvent, onClick, titleBtn, isButton = false} = props;

  return (
    <>
      {isCardEvent.map((value, index) => {
        return (
          <Card
            key={index}
            hoverable
            style={{
              width: 320,
              borderRadius: 6,
              marginTop: 16,
              marginBottom: 5,
              // borderColor: 'white',
              // border: 2,
            }}
            cover={
              <img
                style={{
                  height: 200,
                  width: 340,
                  // margin: '4px 4px 0px 4px',
                  borderRadius: '6px 6px 0px 0px',
                }}
                src={value.src}></img>
            }>
            <div className="uppercase text-lg font-bold  border-b-2 border-slate-100">
              {value.title}
            </div>
            <div className="text-sm my-3 border-b-2 border-slate-100">
              {value.venue}
            </div>

            {/* <div className="flex justify-start gap-6 ">
              <div className="w-full">
                <div className="font-semibold text-sm pb-2">
                  Tanggal & Waktu
                </div>

                <div className="pb-2">
                  <div className="flex gap-1">
                    <div>
                      <ClockCircleOutlined style={styleIcon} />
                    </div>

                    <div className="text-sm border-b-2 border-slate-100">
                      {value?.time.slice(11, 16)}
                    </div>

                    <div className="pl-6">
                      <CalendarOutlined style={styleIcon} />
                    </div>
                    <div className="text-sm border-b-2 border-slate-100">
                      {value.date}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex text-md font-semibold">{value.price}</div>
            {isButton ? (
              <Button
                onClick={() => onClick(value.id_orders)}
                style={{
                  width: '100%',
                  height: 28,
                  marginTop: 8,
                  color: 'white',
                  backgroundColor: '#47B5FF',
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 500,
                }}>
                {titleBtn}
              </Button>
            ) : (
              <Link href={value.href}>
                <Button
                  onClick={() => onClick(value.id_orders)}
                  style={{
                    width: '100%',
                    height: 28,
                    marginTop: 8,
                    color: 'white',
                    backgroundColor: '#47B5FF',
                    borderRadius: 4,
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                  {titleBtn}
                </Button>
              </Link>
            )}
          </Card>
        );
      })}
    </>
  );
};

export default CardEvent;
