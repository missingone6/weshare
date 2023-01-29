import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Space, message } from 'antd';
import ErrorBoundaryWrapper from './style';
import { useCallback } from 'react';


const ErrorBoundary = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate('/home/index'), []);
  const goBack = useCallback(() => navigate(-1), []);
  return (
    <ErrorBoundaryWrapper>
      <div className="wrapper">
        <div className="title">404</div>
        <div className="description">你似乎来到了没有知识存在的荒原</div>
        <div className="button-box">
          <Button type='primary' className='mr20' onClick={goHome}>回到首页</Button>
          <Button type='primary' onClick={goBack}>返回上一页</Button>
        </div>
      </div>
    </ErrorBoundaryWrapper>
  )
}

export default ErrorBoundary;
