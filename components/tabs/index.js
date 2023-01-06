import {Tabs} from 'antd';
const {TabPane} = Tabs;

const TabView = (props) => {
  const {isTabs} = props;
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Tabs onChange={onChange}>
      {isTabs.map((value, index) => {
        return (
          <TabPane key={index} tab={value.name}>
            {value.des}
          </TabPane>
        );
      })}
    </Tabs>
  );
};
export default TabView;
