const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // If you add auth later
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response.data, // Directly return data
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
    toast.error(message);
    return Promise.reject(message);
  }
);

// Export API methods with consistent response handling
export const fetchEmployees = (params) => API.get('/employees', { params });
export const fetchEmployee = (id) => API.get(`/employees/${id}`);
export const createEmployee = (employee) => API.post('/employees', employee);
export const updateEmployee = (id, employee) => API.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);