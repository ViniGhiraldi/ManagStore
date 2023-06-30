import { Api } from "../axios-config"

export interface IUserData{
    nome: string;
    foto: string;
}

export interface IAuth{
    accessToken: string;
    refreshToken: string;
    userData: IUserData;
}

const auth = async (email: string, senha: string): Promise<IAuth | Error> => {
    try {
        const { data } = await Api.post('/entrar', {email, senha})

        return data;
    } catch (error) {
        console.log(error);
        return new Error((error as {message: string}).message || 'Erro no login.');
    }

}

const refreshToken = async (refreshToken: string): Promise<IAuth | Error> => {
    try {
        const { data } = await Api.post('/refresh-token', {refreshToken});

        return data;
    } catch (error) {
        console.log(error);
        return new Error((error as {message: string}).message || 'Erro no login.');
    }
}

export const AuthService = {
    auth,
    refreshToken
}