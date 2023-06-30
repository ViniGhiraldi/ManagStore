import { useState } from "react";
import { useAuthContext } from "../../shared/contexts"
import { NavLink } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useAuthContext();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const result = await login(email, senha)
        if(result instanceof Error){
            console.log(result.message);
        }else{
            location.href = '/';
        }
    }

    return(
        <div className='flex flex-1 justify-center items-center'>
            <div className='bg-white shadow-md rounded-md p-3 space-y-4'>
                <h1 className='text-2xl text-center'>Login</h1>
                <form className='flex flex-col gap-2'>
                    <input type="text" placeholder='email' className='bg-black/10 focus:bg-black/20 outline-none p-2 rounded-sm' value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder='senha' className='bg-black/10 focus:bg-black/20 outline-none p-2 rounded-sm' value={senha} onChange={e => setSenha(e.target.value)}/>
                    <button className='p-2 rounded-sm w-fit outline-none bg-orange-400 hover:bg-orange-500 text-white' onClick={(e) => handleSubmit(e)}>Entrar</button>
                    <NavLink to='/register' className='text-sm text-right text-orange-500 hover:underline'>Criar conta</NavLink>
                </form>
            </div>
        </div>
    );
}