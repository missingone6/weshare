import styled from 'styled-components';

const ErrorBoundaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  .wrapper{
    height: 250px;
    width: 300px;
  }
  .title{
    height: 80px;
    font-size: 30px;
    font-weight: 600;
    color: #646464;
    line-height: 80px;
  }
  .description{
    height: 60px;
    font-size: 18px;
    color: #646464;
    line-height: 60px;
  }
  .button-box{
    height: 110px;
    line-height: 110px;
  }
  .mr20{
    margin-right: 20px;
  }
`;

export default ErrorBoundaryWrapper;