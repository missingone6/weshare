import { useDispatch } from 'react-redux';
import { TOKEN, USERINF } from '../../storage/config';
import localStorage from '../../storage/localStorage';
import { clearAuth, setAuth } from '../../store/features/userSlice';
import { isJwtExpired } from '../../utils';
import { message } from 'antd';


// 页面初次挂载时，从localStorage中取出token和useInf，放入redux中
const GetAuthFromLocalStorage = ({ children }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem(TOKEN);
  const userInf = localStorage.getItem(USERINF);

  if (token !== '' && userInf !== null) {
    if (!isJwtExpired(token)) {
      dispatch(setAuth({
        token,
        userInf: JSON.parse(userInf)
      }))
    } else {
      message.error('登录过期，请重新登录');
      dispatch(clearAuth());
    }
  }

  return children;
}

export default GetAuthFromLocalStorage;