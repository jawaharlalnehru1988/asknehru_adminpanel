import axios from 'axios';

const API_BASE_URL = 'https://api.asknehru.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (username, password) => {
  const response = await api.post('/auth/login', { usernameOrEmail: username, password });
  return response.data;
};

// Conversations APIs
export const getMainTopics = async () => {
  const response = await api.get('/conversations/main-topics');
  return response.data;
};

export const getConversations = async () => {
  const response = await api.get('/conversations');
  return response.data;
};

export const getConversation = async (id) => {
  const response = await api.get(`/conversations/${id}`);
  return response.data;
};

export const createConversation = async (data, articleAudioFile, conversationAudioFile) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (articleAudioFile) {
    formData.append('articleAudio', articleAudioFile);
  }
  if (conversationAudioFile) {
    formData.append('conversationAudio', conversationAudioFile);
  }
  
  const response = await api.post('/conversations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateConversation = async (id, data, articleAudioFile, conversationAudioFile) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (articleAudioFile) {
    formData.append('articleAudio', articleAudioFile);
  }
  if (conversationAudioFile) {
    formData.append('conversationAudio', conversationAudioFile);
  }
  
  const response = await api.put(`/conversations/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteConversation = async (id) => {
  const response = await api.delete(`/conversations/${id}`);
  return response.data;
};

// Roadmaps APIs
export const getRoadmaps = async () => {
  const response = await api.get('/roadmaps');
  return response.data;
};

export const getRoadmap = async (id) => {
  const response = await api.get(`/roadmaps/${id}`);
  return response.data;
};

export const createRoadmap = async (data, imageFile) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await api.post('/roadmaps', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateRoadmap = async (id, data, imageFile) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await api.put(`/roadmaps/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteRoadmap = async (id) => {
  const response = await api.delete(`/roadmaps/${id}`);
  return response.data;
};

export default api;
