import styled from 'styled-components';

const MyListWrapper = styled.div`
  background-color: white;
  .list-item{
    cursor: pointer;
    &:hover{
      opacity: 0.8;
    }
    .list-item-favs{
      color: #2db7f5;
      width: 60px;
    }
    .list-item-title{
      font-size: 18px;
      font-weight: 600;
    }
  }

`;

export default MyListWrapper