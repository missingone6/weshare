import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TOKEN, USERINF } from '../../storage/config';
import localStorage from '../../storage/localStorage';
import { setAuth } from '../../store/features/userSlice';

// 页面初次挂载时，从localStorage中取出token和useInf，放入redux中

const GetAuthFromLocalStorage = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const userInf = localStorage.getItem(USERINF);
    console.log(token, userInf);

    if (token !== '' && userInf !== null) {
      dispatch(setAuth({
        token,
        userInf: JSON.parse(userInf)
      }))
      console.log(111)
    }
  }, []);

  return children;
}


export default GetAuthFromLocalStorage;