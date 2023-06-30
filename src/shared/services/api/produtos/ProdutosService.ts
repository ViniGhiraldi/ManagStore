import { Environment } from "../../../environment";
import { IProduto } from "../../models";
import { Api } from "../axios-config"

type TProdutosComTotalCount = {
    data: IProduto[];
    totalCount: number;
}

const getAll = async (page: number = 1, filter = '', category: 'livros' | 'jogos' | undefined = undefined): Promise<TProdutosComTotalCount | Error> => {
    try {
        let urlRelativa = `/produtos?page=${page}&limit=${Environment.LIMIT}&filter=${filter}`;
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

const getById = async (id: number): Promise<IProduto | Error> => {
    try {
        const { data } = await Api.get(`/produtos/${id}`)

        if(data) return data;
        
        return new Error('Erro ao consultar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
}

const create = async (produto: Omit<IProduto, 'id'>): Promise<void | Error> => {
    try {
        const { data } = await Api.post(`/produtos`, produto);

        if(data) return;
        
        return new Error('Erro ao criar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao criar registro');
    }
}

const updateById = async (id: number, produto: Omit<IProduto, 'id'>): Promise<void | Error> => {
    try {
        await Api.put(`/produtos/${id}`, produto);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    }
}

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/produtos/${id}`);
    } catch (error) {
        console.log(error);
        return new Error('Erro ao apagar registro');
    }
}

export const ProdutosService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}