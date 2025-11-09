import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code,
    });
    return Promise.reject(error);
  }
);

// Authentication APIs
export const login = async (username: string, password: string) => {
  const response = await api.post('/api/login', { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post('/api/register', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/api/logout');
  return response.data;
};

// Text Extraction APIs
export const extractPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/extract/pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const extractDOCX = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/extract/docx', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// AI Processing API
export interface ProcessTextParams {
  operation: string;
  text: string;
  language?: string;
  tone?: string;
  adaptation?: string;
  summary_type?: string;
  depth_level?: string;
  readability_level?: string;
  content_type?: string;
}

export const processText = async (params: ProcessTextParams) => {
  const response = await api.post('/api/process', params);
  return response.data;
};

// Text Comparison API
export const compareTexts = async (text1: string, text2: string) => {
  const response = await api.post('/api/compare', { text1, text2 });
  return response.data;
};

// Text-to-Speech API
export const textToSpeech = async (text: string, language: string = 'English') => {
  const response = await api.post(
    '/api/text-to-speech',
    { text, language },
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

// Export API
export interface ExportParams {
  text: string;
  title?: string;
  format: 'pdf' | 'docx' | 'md' | 'html' | 'json';
}

export const exportText = async (params: ExportParams) => {
  const response = await api.post('/api/export', params, {
    responseType: 'blob',
  });
  return response.data;
};

// History APIs
export interface HistoryItem {
  id: string;
  operation: string;
  timestamp: string;
  preview: string;
  fullOutput: string;
  parameters: {
    tone?: string;
    style?: string;
    language?: string;
    [key: string]: any;
  };
}

export const getHistory = async (username: string): Promise<HistoryItem[]> => {
  const response = await api.get('/api/history', {
    params: { username },
  });
  return response.data;
};

export interface AddHistoryParams {
  username: string;
  operation: string;
  params: Record<string, any>;
  output: string;
}

export const addHistory = async (params: AddHistoryParams) => {
  const response = await api.post('/api/history/add', params);
  return response.data;
};

export const clearHistory = async (username: string) => {
  const response = await api.post('/api/history/clear', { username });
  return response.data;
};

// Profile APIs
export interface Profile {
  preferred_tone: string;
  preferred_style: string;
  preferred_language: string;
  preferred_depth: string;
}

export const getProfile = async (username: string): Promise<Profile> => {
  const response = await api.get('/api/profile', {
    params: { username },
  });
  return response.data;
};

export interface UpdateProfileParams {
  username: string;
  tone?: string;
  style?: string;
  language?: string;
  depth?: string;
}

export const updateProfile = async (params: UpdateProfileParams) => {
  const response = await api.post('/api/profile/update', params);
  return response.data;
};

// Helper function to download blob
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Helper function to create audio URL from blob
export const createAudioURL = (blob: Blob): string => {
  return window.URL.createObjectURL(blob);
};

export default api;

