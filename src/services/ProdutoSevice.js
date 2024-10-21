import api from './axios';

export const getProdutos = () => api.get('/Produto/RetornarProdutos');
export const getProdutoById = (id) => api.get(`/Produto/RetornarProdutosPorId/${id}`);
export const createProduto = (produto) => api.post('/Produto/CriarProduto', produto);
export const updateProduto = (id, produto) => api.put(`/Produto/AtualizarProdutoPorId/${id}`, produto);
export const deleteProduto = (id) => api.delete(`/Produto/DeletarProdutoPorId/${id}`);