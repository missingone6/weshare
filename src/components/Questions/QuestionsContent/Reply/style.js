import styled from 'styled-components';

const MyListWrapper = styled.div`
  background-color: white;
  .list-header{
    display: flex;
    justify-content: space-between;
    .list-headerText{
      line-height: 48px;
    }
  }

  .name{
    color: #1677ff;
    font-size: 14px;
    margin-right: 5px;
  }
   .red{
    color: red;
   }
  .list-item{
    cursor: pointer;
    &:hover{
      opacity: 0.8;
    }
  }
  .ant-list-item-meta-title{
    margin-bottom: 0px!important;
  }

`;

export default MyListWrapper