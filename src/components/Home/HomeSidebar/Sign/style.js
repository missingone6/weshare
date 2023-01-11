import styled from 'styled-components';

const SignWrapper = styled.div`
  background-color: white;
  width: 100%;
  .red{
    color:red;
  }
  .sign-header{
    height: 38px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    .left{
      float: left;
      height: 38px;
    }
    .right{
      margin-right: 16px;
      line-height: 50px;
      float: right;
      line-height: 46px;
    }
  }
  .sign-content{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    .sign-content-area{
      height: 32px;
    }
  }
`;

export default SignWrapper