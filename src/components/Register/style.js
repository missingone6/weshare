import styled from 'styled-components';

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 64px - 64px);
  .register-form{
    width: 384px;
    height: 448px;
    padding: 40px 40px;
    box-shadow: 0 12px 24px 0 rgb(28 31 33 / 10%);
    .register-form-captcha{
      width: 150px;
      height: 50px;
      cursor: pointer;
    }
  }
`;

export default RegisterWrapper;