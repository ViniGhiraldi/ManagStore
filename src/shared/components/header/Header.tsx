import { Library, Search } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../contexts";
import { Environment } from "../../environment";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProdutosService } from "../../services/api/produtos/ProdutosService";
import { Loading } from "..";
import { useDebounce } from "../../hooks";

export const Header = () => {
    const {isAuthenticated, logout} = useAuthContext();

    const [queryCards, setQueryCards] = useState<React.ReactNode[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchRef = useRef<HTMLInputElement>(null);

    const debounce = useDebounce(500, false);

    const query = useMemo(() => {
        return searchParams.get('query')?.toString() || '';
    }, [searchParams])

    const getProfile = useMemo((): {nome: string; foto: string} => {
        const userData = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__USER_DATA);
        if(userData){
            return JSON.parse(userData) as {nome: string; foto: string};
        }
        return {nome: '', foto: ''};
    }, [[localStorage]]) //[[localStorage]]

    const handleSearchQueryOnClick = (id: number) => {
        if(searchRef.current) searchRef.current.value = '';
        location.href = `/product/${id}`;
    }

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            ProdutosService.getAll(1, query).then(result => {
                setIsLoading(false);
                if(result instanceof Error){
                    console.log(result.message);
                }else{
                    const cards = result.data.map(produto => (
                        <div className='flex items-center justify-between p-1 pr-4 hover:bg-black/10 focus:bg-black/10 outline-none cursor-pointer' tabIndex={0} onKeyUp={(e) => e.code === 'Enter' && handleSearchQueryOnClick(produto.id)} onClick={() => handleSearchQueryOnClick(produto.id)}>
                            <div className='flex gap-2'>
                                <div className='w-12'>
                                    <img className='h-12 m-auto max-w-full' src={produto.foto} alt={produto.nome}/>
                                </div>
                                <div className='flex flex-col justify-between w-72 lg:w-44 md:w-28 sm:w-52'>
                                    <span className='max-w-full whitespace-nowrap overflow-hidden text-ellipsis' title={produto.nome}>{produto.nome}</span>
                                    <pre className='text-xs'>{produto.categoria}</pre>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center sm:hidden'>
                                {produto.promocao && (
                                    <span className='px-2 bg-green-400 rounded-sm shadow-md'>-{produto.promocao}%</span>
                                )}
                                {produto.promocao && (
                                    <span>
                                        R$ {(produto.valor - (produto.valor * (produto.promocao / 100))).toFixed(2).replace('.', ',')}
                                    </span>
                                )}
                                {!produto.promocao && (
                                    <span>
                                        R$ {produto.valor.toFixed(2).replace('.', ',')}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
    
                    setQueryCards(cards);
                }
            })
        })
    }, [query])

    return(
        <header className='flex fixed h-16 w-full gap-4 z-50 px-8 sm:px-4 items-center justify-between bg-white/10 backdrop-blur-md sm:backdrop-blur-xl'>
            <nav className='flex'>
                <NavLink to='/'>
                    <img className='h-10 sm:h-8 w-auto' src="https://www.cbvj.org.br/index/wp-content/uploads/2017/10/default-logo.png" alt="Logo"/>
                </NavLink>
            </nav>
            <div className='w-1/2'>
                <div className='flex items-center'>
                    <Search size={20} strokeWidth={1.5} className='w-10 sm:hidden translate-x-full text-zinc-900/80'/>
                    <input type="search" ref={searchRef} className='w-full bg-transparent border border-zinc-900/70 rounded-md pl-9 pr-4 sm:p-2 py-2 outline-white placeholder:text-zinc-900/80 focus:bg-black/10' placeholder='Pesquisar...' onChange={(e) => setSearchParams({query: e.target.value}, {replace: true})}/>
                </div>
                {searchRef.current?.value && (
                    <div className='mt-2 py-1 bg-white rounded-md shadow-md fixed w-1/2 sm:w-full sm:left-0 max-h-72 overflow-y-auto scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-black/20 hover:scrollbar-thumb-black/30 scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
                        {isLoading && (
                            <div className='flex justify-center'>
                                <Loading/>
                            </div>
                        )}
                        {queryCards.map((card, i) => (
                            <div key={i}>{card}</div>
                        ))}
                        {!queryCards.length && (
                            <div className='text-center'>
                                <h1 className='capitalize'>Sem resultados</h1>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <nav className='flex items-center gap-4 font-sans text-zinc-900'>
                {!isAuthenticated && (
                    <NavLink to='/login' className='py-2 px-4 bg-orange-400 rounded-sm shadow-md hover:bg-orange-500'>
                        Entrar
                    </NavLink>
                )}

                {isAuthenticated && (
                    <>
                    <NavLink to='/my/products?page=1' className='capitalize hover:underline whitespace-nowrap overflow-hidden text-ellipsis' title='Meus Produtos'>
                        <Library size={20} strokeWidth={1.5}/>
                    </NavLink>
                    <button onClick={() => {logout(); location.href = '/'}} className='flex items-center gap-2 hover:underline' title={getProfile.nome}>
                        <span className='uppercase font-semibold max-w-xs sm:hidden overflow-hidden text-ellipsis whitespace-nowrap'>
                            {getProfile.nome.split(' ')[0]}
                        </span>
                        <img className='h-10 aspect-square rounded-full' src={getProfile.foto} alt="Perfil"/>
                    </button>
                    </>
                )}
            </nav>
        </header>
    );
}