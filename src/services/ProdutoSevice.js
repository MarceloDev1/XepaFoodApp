import api from './axios';

export const getProdutos = () => api.get('/api/Produto/RetornarProdutos');
export const getProdutoById = (id) => api.get(`/api/Produto/RetornarProdutosPorId/${id}`);
export const createProduto = (produto) => api.post('/api/Produto/CriarProduto', produto);
export const updateProduto = (id, produto) => api.put(`/api/Produto/AtualizarProdutoPorId/${id}`, produto);
export const deleteProduto = (id) => api.delete(`/api/Produto/DeletarProdutoPorId/${id}`);