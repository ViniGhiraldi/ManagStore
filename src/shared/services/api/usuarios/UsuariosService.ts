import { IUsuario } from "../../models";
import { Api } from "../axios-config"

const register = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post('/cadastrar', usuario);

        return data;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registros');
    }
}

export const UsuariosService = {
    register
}