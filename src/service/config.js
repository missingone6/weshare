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

// 特殊的，需要鉴权的，需要带上jwt
export const PRIVATE_PATH_ARRAY = [
  /^\/api\/public\/comments$/,
]
