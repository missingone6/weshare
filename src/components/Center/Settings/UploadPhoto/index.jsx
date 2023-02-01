import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uploadPhotoAction } from '../../../../api/content';
import { BASE_URL } from '../../../../service/config';
import { setUserInf } from '../../../../store/features/userSlice';
import UploadPhotoWrapper from './style';

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const UploadPhoto = () => {
  const dispatch = useDispatch()
  const { userInf } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(userInf?.pic);
  const submit = async (obj) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('photo', obj.file);
    const result = await uploadPhotoAction(formData);
    const { code, msg, data } = result;
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg,
      });
      dispatch(setUserInf({
        ...userInf,
        pic: data,
      }));
      setImageUrl(data)
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
    setLoading(false);
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传头像
      </div>
    </div>
  );
  return (
    <UploadPhotoWrapper>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={submit}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? (
          <img
            src={`${BASE_URL}${imageUrl}`}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </UploadPhotoWrapper>
  );
};
export default UploadPhoto;

