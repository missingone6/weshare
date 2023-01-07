const developmentBaseUrl = 'http://localhost:8000';
const productionBaseUrl = '';


export const BASE_URL = process.env.NODE_ENV === 'development' ? developmentBaseUrl : productionBaseUrl;
export const TIMEOUT = 5000;