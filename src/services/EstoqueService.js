import api from './axios';

export const getEstoquePorProduto = (idProduto) => api.get(`/Estoque/RetornarEstoquePorIdProduto/${idProduto}`);
export const getEstoquePorLoja = (idLoja) => api.get(`/Estoque/RetornarEstoquePorIdLoja/${idLoja}`);
export const inserirEstoque = (estoque) => api.post('/Estoque/InserirEstoque', estoque);
export const atualizarEstoque = (id, estoque) => api.put(`/Estoque/AtualizarEstoquePorId/${id}`, estoque);
export const deletarEstoque = (idProduto) => api.delete(`/Estoque/DeletarEstoquePorId/${idProduto}`);