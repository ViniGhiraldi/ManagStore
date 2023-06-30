import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";
import { Environment } from "../environment";
import { Api } from "../services/api/axios-config";

interface IAuthContext{
    isAuthenticated: boolean;
    login: (email: string, senha: string) => Promise<Error | undefined>;
    logout: () => void;   
}

const AuthContext = createContext({} as IAuthContext);

export const useAuthContext = () => {
    return useContext(AuthContext);
}

interface IAuthProvider{
    children?: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const refreshToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__REFRESH_TOKEN);
        if(refreshToken){
            AuthService.refreshToken(refreshToken).then(result => {
                if(result instanceof Error){
                    console.log(result.message);
                }else{
                    localStorage.setItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.accessToken);
                    localStorage.setItem(Environment.LOCAL_STORAGE_KEY__REFRESH_TOKEN, result.refreshToken);
                    localStorage.setItem(Environment.LOCAL_STORAGE_KEY__USER_DATA, JSON.stringify(result.userData));
                    Api.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
                    setIsAuthenticated(true);
                    console.log(result.accessToken);
                }
            })
        }
    }, [])

    const login = useCallback(async (email: string, senha: string) => {
        const result = await AuthService.auth(email, senha);

        if(result instanceof Error) return result;

        localStorage.setItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.accessToken);
        localStorage.setItem(Environment.LOCAL_STORAGE_KEY__REFRESH_TOKEN, result.refreshToken);
        localStorage.setItem(Environment.LOCAL_STORAGE_KEY__USER_DATA, JSON.stringify(result.userData));
        Api.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
        setIsAuthenticated(true);
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        localStorage.removeItem(Environment.LOCAL_STORAGE_KEY__REFRESH_TOKEN);
        localStorage.removeItem(Environment.LOCAL_STORAGE_KEY__USER_DATA);
        Api.defaults.headers.common['Authorization'] = '';
        setIsAuthenticated(false);
    }, [])

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}