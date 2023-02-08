import styled from 'styled-components';

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 200px;
  .basicInf-box{
    width: 100%;
    .avatar{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .name{
      margin-top: 5px;
      text-align: center;
      font-size: 28px;
      color: #222222;
      height: 25px;
      line-height: 20px;
    }
    .otherInf{
      margin-top: 5px;
      display: flex;
      justify-content: center;
      color: rgb(89, 89, 89);
      .favs{
        margin-right: 10px;
      }
      .created{
        margin-right: 10px;
      }
      .red{
        color: red;
      }
      .blue{
        color: rgb(75, 168, 255);
      }
    }
    .regmark{
      margin-top: 5px;
      color: rgb(89, 89, 89);
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .btn{
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default StyleWrapper