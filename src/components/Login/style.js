import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .login-form{
    width: 384px;
    height: 448px;
    padding:60px 40px;
    box-shadow: 0 12px 24px 0 rgb(28 31 33 / 10%);
    .login-form-captcha{
      width: 150px;
      height: 50px;
      cursor: pointer;
    }
  }
`;

export default LoginWrapper;