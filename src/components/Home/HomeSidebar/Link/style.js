import styled from 'styled-components';

const LinkWrapper = styled.div`
  background-color: white;
  width: 100%;
  .link-header{
    line-height: 38px;
    padding: 0 16px;
    height: 38px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    font-size: 16px;
  }
  .link-content{
    display: flex;
    padding: 0 16px;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-height: 50px;
    .link-href{
      margin:10px;
    }
  }
`;

export default LinkWrapper