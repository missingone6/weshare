import styled from 'styled-components';

const StyleWrapper = styled.div`
  background-color: white;
  margin-bottom: 10px;
  .post-header{
    padding: 0 24px;
    height: 100px;
    .post-title{
      line-height: 70px;
      height: 70px;
      font-size: 30px;
    }
    .post-header-content{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      .status{
        display: flex;
        .read{
          margin: 0 6px;
        }
        .like{
          cursor: pointer;
        }
      }
      
    }
  }
  .post-user{
    display: flex;
    flex-wrap: wrap;
    margin: 0 24px;
    height: 120px;
    background-color: rgb(245, 245, 245); 
    .user-box{
      width: 100%;
      display: flex;
      height: 80px;
      border-bottom: 1px solid #cccccc75;
      .photo{
        width: 80px;
        padding: 15px;
      }
      .user-box-content{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name{
          color: #1677ff;
          font-size: 14px;
          margin-right: 5px;
        }
        .time{
          color: rgba(0, 0, 0, 0.45);
        }
        .favs{
          color:rgb(208, 106, 64);
        }
      }
    }
    .action-box{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 40px;
    }
  }
 
  .post-content{
    margin: 20px 24px 0;
    padding-bottom: 20px;
  }
  
`;

export default StyleWrapper