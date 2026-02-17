import axios from 'axios';

const API_BASE_URL = 'https://api.asknehru.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Removed authentication - all endpoints are now public
// Removed default Content-Type header to allow axios to set it automatically for FormData

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
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }), 'data.json');
  if (articleAudioFile) {
    formData.append('articleAudio', articleAudioFile);
  }
  if (conversationAudioFile) {
    formData.append('conversationAudio', conversationAudioFile);
  }
  
  const response = await api.post('/conversations', formData);
  return response.data;
};

export const updateConversation = async (id, data, articleAudioFile, conversationAudioFile) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }), 'data.json');
  if (articleAudioFile) {
    formData.append('articleAudio', articleAudioFile);
  }
  if (conversationAudioFile) {
    formData.append('conversationAudio', conversationAudioFile);
  }
  
  const response = await api.put(`/conversations/${id}`, formData);
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

export const getRoadmapMainTopics = async () => {
  try {
    const response = await api.get('/roadmaps/main-topics');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    const status = error?.response?.status;
    if (status === 400 || status === 404) {
      const fallbackResponse = await api.get('/conversations/main-topics');
      const topics = Array.isArray(fallbackResponse.data) ? fallbackResponse.data : [];
      return topics
        .map((topic) => {
          if (typeof topic === 'string') {
            return topic;
          }
          return topic?.value || topic?.label;
        })
        .filter(Boolean);
    }
    throw error;
  }
};

export const getRoadmap = async (id) => {
  const response = await api.get(`/roadmaps/${id}`);
  return response.data;
};

export const createRoadmap = async (data, imageFile) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }), 'data.json');
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await api.post('/roadmaps', formData);
  return response.data;
};

export const updateRoadmap = async (id, data, imageFile) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }), 'data.json');
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await api.put(`/roadmaps/${id}`, formData);
  return response.data;
};

export const deleteRoadmap = async (id) => {
  const response = await api.delete(`/roadmaps/${id}`);
  return response.data;
};

// Yoga Poses APIs
export const getYogaPoses = async () => {
  const response = await api.get('/yoga/poses');
  return response.data;
};

export const getYogaPose = async (id) => {
  const response = await api.get(`/yoga/poses/${id}`);
  return response.data;
};

export const searchYogaPoses = async (yogaName) => {
  const response = await api.get('/yoga/poses/search', {
    params: { yogaName },
  });
  return response.data;
};

export const createYogaPose = async (data) => {
  const response = await api.post('/yoga/poses', data);
  return response.data;
};

export const uploadYogaImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload/image', formData);
  return response.data;
};

export const uploadYogaAudio = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload/audio', formData);
  return response.data;
};

export const updateYogaPose = async (id, data) => {
  const response = await api.put(`/yoga/poses/${id}`, data);
  return response.data;
};

export const deleteYogaPose = async (id) => {
  const response = await api.delete(`/yoga/poses/${id}`);
  return response.data;
};

export default api;
