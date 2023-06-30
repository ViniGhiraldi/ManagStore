import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { UsuariosService } from "../../shared/services/api/usuarios/UsuariosService";

export const Register = () => {
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const fotoRef = useRef<HTMLImageElement>(null)

    const handleFotoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]){
            const reader = new FileReader();
    
            reader.readAsDataURL(e.target.files[0]);
    
            reader.onload = (e) => {
                if(!e.target?.result || !fotoRef.current) return;
                setFoto(e.target.result.toString());
                fotoRef.current.src = e.target.result.toString();
            }
        }else{
            setFoto('');
            if(!fotoRef.current) return;
            fotoRef.current.src = 'https://cdn-icons-png.flaticon.com/512/4792/4792929.png';
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log({nome, foto, email, senha});
        const result = await UsuariosService.register({nome, foto, email, senha});
        if(result instanceof Error){
            console.log(result.message);
        }else{
            alert('Cadastrado com sucesso!')
            location.href = '/login';
        }
    }

    return(
        <div className='flex flex-1 justify-center items-center'>
            <div className='bg-white shadow-md rounded-md p-3 pt-0'>
                <div className='flex flex-col items-center -translate-y-5'>
                    <label htmlFor='foto' className='w-20 aspect-square flex items-center justify-center bg-zinc-200 cursor-pointer rounded-full border-2 border-white'>
                        <input type="file" accept='image/*' id="foto" className='hidden' onChange={e => handleFotoOnChange(e)}/>
                        <img className='border rounded-full aspect-square' ref={fotoRef} src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png"/>
                    </label>
                    <label htmlFor='foto' className='text-xs opacity-75 cursor-pointer'>Clique para adicionar uma foto</label>
                </div>
                <form className='flex flex-col gap-2'>
                    <input type="text" placeholder='nome' className='bg-black/10 focus:bg-black/20 outline-none p-2 rounded-sm' value={nome} onChange={e => setNome(e.target.value)}/>
                    <input type="text" placeholder='email' className='bg-black/10 focus:bg-black/20 outline-none p-2 rounded-sm' value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder='senha' className='bg-black/10 focus:bg-black/20 outline-none p-2 rounded-sm' value={senha} onChange={e => setSenha(e.target.value)}/>
                    <button className='p-2 rounded-sm w-fit outline-none bg-orange-400 hover:bg-orange-500 text-white' onClick={(e) => handleSubmit(e)}>Registrar-se</button>
                    <NavLink to='/login' className='text-sm text-right text-orange-500 hover:underline'>Entrar</NavLink>
                </form>
            </div>
        </div>
    );
}