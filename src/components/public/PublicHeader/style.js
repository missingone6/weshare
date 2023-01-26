import styled from 'styled-components';

const PublicHeaderWrapper = styled.div`
  height: 100%;
  .logo{
    float: left;
    margin: 16px 24px 16px 0;
    color: white ;
    line-height: 31px ;
    font-size: 26px ;
  }
  .login-area{
    float: right;
    width: 200px;
  }
  .username{
    padding-right: 5px;
  }
`;

export default PublicHeaderWrapper