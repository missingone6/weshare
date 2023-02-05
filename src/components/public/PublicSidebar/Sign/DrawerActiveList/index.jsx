import { Drawer, Menu, List, Avatar, message, Tag } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { getFavsAction } from '../../../../../api/user';
import { BASE_URL } from '../../../../../service/config';
import { fromTime, getColorByFavs } from '../../../../../utils';

const menuActiveListConfig = [
  {
    label: '最新签到',
    key: 'latest',
  },
  {
    label: '今日签到',
    key: 'today',
  },
];

const DrawerActiveList = ({ open, setOpen }) => {

  const [current, setCurrent] = useState('latest');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params) => {
    setLoading(true);
    const result = await getFavsAction(params);
    if (result.code === 200) {
      setData(result.data)
    } else {
      message.open({
        type: 'error',
        content: '获取积分失败',
      });
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData({
      sort: current
    })
  }, [])
  const onClick = async ({ key }) => {
    setCurrent(key);
    fetchData({
      sort: key
    })
  }
  return (
    <Drawer
      title="签到活跃榜单 - TOP 10"
      placement="right"
      closable
      onClose={() => setOpen(false)}
      open={open}
      bodyStyle={{
        paddingTop: 0
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuActiveListConfig}
      />
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={loading}
        renderItem={(item) => {
          const { uid: user } = item;
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`${BASE_URL}${user.pic}`} />}
                title={<a href="https://ant.design">{user.name}</a>}
                description={
                  <>
                    <span>签到于{fromTime(item.created)} </span>
                    <Tag color={getColorByFavs(item.favs)}>{item.favs}积分</Tag>
                  </>
                }
              />
            </List.Item>
          )
        }}
      />
    </Drawer>
  )
}
export default DrawerActiveList;

