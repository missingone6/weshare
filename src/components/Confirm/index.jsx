import { useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Confirm = (props) => {
  const { title, handleSubmit } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.modalText);


  const handleOk = async () => {
    setModalText(`${title}中...`);
    setOpen(false);
    setConfirmLoading(false);
    await handleSubmit();
  };
  const handleCancel = () => {
    setOpen(false);
    navigate('/home/index')
  };

  return (
    <Modal
      title={title}
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
