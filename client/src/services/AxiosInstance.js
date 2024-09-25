import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAccessToken = async () => {
  try {

    const response = await axiosInstance.post('/auth/refresh-token');
    
    const newAccessToken = response.data.accessToken;

    
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw error;
  }
};


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const newAccessToken = await refreshAccessToken();

        
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        
        console.error('Failed to refresh token, redirecting to login...');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
