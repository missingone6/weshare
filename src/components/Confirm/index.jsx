import { useState } from 'react';
import { Modal, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';
import { usernameUpdateAction } from '../../api/user';

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, key } = qs.parse(location.search.slice(1));

  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(`你确定要修改邮箱为${username}吗`);

  const handleOk = async () => {
    setModalText('修改邮箱中...');
    setConfirmLoading(true);
    const { msg, code } = await usernameUpdateAction({
      username, key
    })
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg,
      });
      setOpen(false);
      setConfirmLoading(false);
      message.open({
        type: 'success',
        content: msg + ',即将跳转首页',
      });
      navigate('/login');
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  };
  const handleCancel = () => {
    setOpen(false);
    navigate('/home/index')
  };

  return (
    <Modal
      title="修改邮箱"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText='确认'
      cancelText='取消'
    >
      <p>{modalText}</p>
    </Modal>
  );
}

export default Confirm;
