import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5021', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

api.interceptors.request.use(
  config => config,
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);
// Interceptores de resposta
api.interceptors.response.use(
  response => response, // Retorna a resposta caso esteja tudo certo
  error => {
    // Lidar com erros de resposta
    if (error.response) {
      // Erros da API (respostas com status 4xx ou 5xx)
      console.error('Erro da API:', error.response.data);
    } else if (error.request) {
      // Nenhuma resposta foi recebida
      console.error('Nenhuma resposta recebida:', error.request);
    } else {
      // Outro tipo de erro
      console.error('Erro desconhecido:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;