import styled from 'styled-components';

const UserWrapper = styled.div`
  .title{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #ccc;
  }
  .member-sign-information{
    padding: 11px 0;
    height: 150px;
  }
  .member-information{
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: white;
    width: 100%;
    .red{
      color:red;
    }
    .member-header{
      padding-left: 16px;
      line-height: 38px;
      height: 38px;
      width: 100%;
      border-bottom: 1px solid #f0f0f0;
    }
    .member-content{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      .member-content-area{
        height: 32px;
      }
    }
  }
  .quick-information{
    border: 1px solid #ccc;
    border-radius: 20px;
    .title{
      padding-left: 16px;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      font-weight: 500;
      border-bottom: 1px solid #ccc;
    }
    .row{
      padding-top: 10px;
      .col-item{
        height: 100px;
        width: 100%;
        cursor: pointer;
        .box{
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(22, 119, 255);
          height: 70px;
        }
        .tips{
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
`;

export default UserWrapper