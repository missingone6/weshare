const developmentBaseUrl = 'http://localhost:8000';
const productionBaseUrl = '';


export const BASE_URL = process.env.NODE_ENV === 'development' ? developmentBaseUrl : productionBaseUrl;
export const TIMEOUT = 5000;
// 不需要鉴权
export const PUBLIC_PATH_ARRAY = [
  /^\/public/,
  /^\/api\/login/,
  /^\/api\/public/,
]