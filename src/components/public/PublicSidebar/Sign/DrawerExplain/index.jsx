import { Drawer, Table, Tag } from 'antd';
import { getColorByFavs } from '../../../../../utils';
const columns = [
  {
    title: '连续签到天数',
    dataIndex: 'days',
  },
  {
    title: '每日可获得积分',
    dataIndex: 'favs',
    render: (text) => <Tag color={getColorByFavs(text)}>{text}</Tag>
  },
]
const dataSource = [
  {
    key: '0',
    days: '<=5',
    favs: 5,
  },
  {
    key: '1',
    days: '<=10',
    favs: 10,
  },
  {
    key: '2',
    days: '>10',
    favs: 15,
  },
];
const DrawerExplain = ({ open, setOpen }) => {
  return (
    <Drawer
      title="签到说明"
      placement="right"
      closable
      onClose={() => setOpen(false)}
      open={open}
    >
      <h2>签到可获得经验值，规则如下</h2>
      <Table columns={columns} dataSource={dataSource} />
    </Drawer>
  )
}
export default DrawerExplain;

