import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCaptchaAction } from '../api/login';
import { CAPTCHA_ID } from '../storage/config';
import localStorage from '../storage/localStorage';

const useSvgCaptcha = () => {
  const [svgCaptcha, setSvgCaptcha] = useState();
  const refreshSvgCaptcha = useCallback(async () => {
    const result = await getCaptchaAction({
      params: {
        cid: localStorage.getItem(CAPTCHA_ID)
      }
    });
    setSvgCaptcha(result.data)
  }, [])

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem(CAPTCHA_ID)) {
        localStorage.setItem(CAPTCHA_ID, uuidv4())
      }
      refreshSvgCaptcha();
    })()
  }, []);

  return [svgCaptcha, refreshSvgCaptcha];
}


export default useSvgCaptcha;