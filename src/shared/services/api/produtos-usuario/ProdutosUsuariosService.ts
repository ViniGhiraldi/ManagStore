import { Environment } from "../../../environment";
import { IProduto } from "../../models";
import { Api } from "../axios-config"

type TProdutosDoUsuarioComTotalCount = {
    data: IProduto[];
    totalCount: number;
}

const getAll = async (page: number = 1, filter = '', category: 'livros' | 'jogos' | undefined = undefined): Promise<TProdutosDoUsuarioComTotalCount | Error> => {
    try {
        let urlRelativa = `/produtos-usuarios?page=${page}&limit=${Environment.LIMIT}&filter=${filter}`;
        if(category){
            urlRelativa += `&category=${category}`;
        }
        const { data, headers } = await Api.get(urlRelativa)

        return {
            data,
            totalCount: Number(headers['x-total-count'] || 0)
        }
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registros');
    }
}

const getById = async (produto_id: number): Promise<IProduto | Error> => {
    try {
        const { data } = await Api.get(`/produtos-usuarios/${produto_id}`)

        if(data) return data;
        
        return new Error('Erro ao consultar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
}

const create = async (produto_id: number): Promise<void | Error> => {
    try {
        const { data } = await Api.post(`/produtos-usuarios`, {produto_id});

        if(data) return;
        
        return new Error('Erro ao criar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao criar registro');
    }
}

const deleteById = async (produto_id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/produtos-usuarios/${produto_id}`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao apagar registro');
    }
}

export const ProdutosUsuariosService = {
    deleteById,
    getById,
    getAll,
    create
}