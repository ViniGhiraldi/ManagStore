import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProdutosService } from "../../shared/services/api/produtos/ProdutosService";
import { IProduto } from "../../shared/services/models";
import { useAuthContext } from "../../shared/contexts";
import { ProdutosUsuariosService } from "../../shared/services/api/produtos-usuario/ProdutosUsuariosService";
import { Loading } from "../../shared/components";

export const Product = () => {
    const { id } = useParams<'id'>();
    const { isAuthenticated } = useAuthContext();
    const [productData, setProductData] = useState<IProduto>({} as IProduto);
    const [acquired, setAcquired] = useState(false);
    const [productIsLoading, setProductIsLoading] = useState(false);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);

    useEffect(() => {
        setProductIsLoading(true);
        setButtonIsLoading(true);
        setAcquired(false);
        if(!Number(id)){
            location.href = '/';
        }else{
            ProdutosService.getById(Number(id)).then(result => {
                setProductIsLoading(false);
                if(result instanceof Error){
                    console.log(result.message);
                }else{
                    setProductData(result);
                }
            })
    
            if(isAuthenticated){
                ProdutosUsuariosService.getById(Number(id)).then(result => {
                    setButtonIsLoading(false);
                    if(result instanceof Error){
                        setAcquired(false);
                        console.log(result.message);
                    }else{
                        setAcquired(true);
                    }
                })
            }else{
                setButtonIsLoading(false);
            }
        }
    }, [id])

    const handleOnClick = () => {
        setButtonIsLoading(true);
        ProdutosUsuariosService.create(productData.id).then(result => {
            setButtonIsLoading(false);
            if(result instanceof Error){
                console.log(result.message);
            }else{
                setAcquired(true);
                alert(productData.nome + ' comprado com sucesso!');
            }
        })
    }

    return(
        <div className='p-20 lg:p-10 lg:pt-20 sm:px-0 flex flex-1'>
            <div className='flex sm:flex-col w-full gap-12 lg:gap-4 bg-white rounded-lg sm:rounded-none shadow-md p-8'>
                <div className='flex flex-col sm:items-center gap-4 w-60 md:w-48 sm:w-full'>
                    <div className='flex items-center justify-center h-60 md:h-48 w-60 md:w-48'>
                        {!productIsLoading && (
                            <img className='h-full rounded-sm' src={productData.foto} alt={productData.nome}/>
                        )}
                        {productIsLoading && <Loading/>}
                    </div>
                    <div className='flex flex-col flex-1 gap-4 justify-end w-full'>
                        {productData.promocao && productData.promocao > 0 && (
                            <div className='flex flex-col'>
                            <span className='w-fit md:text-sm px-2 bg-green-500 rounded-sm shadow-md'>-{productData.promocao}%</span>
                            <div className='flex items-center gap-4'>
                                <span className='text-sm md:text-xs line-through'>R$ {productData.valor.toFixed(2).replace('.', ',')}</span>
                                <h1 className='text-4xl md:text-2xl sm:text-4xl whitespace-nowrap overflow-hidden text-ellipsis' title={`R$ ${(productData.valor - (productData.valor * (productData.promocao / 100))).toFixed(2)}`}>R$ {(productData.valor - (productData.valor * (productData.promocao / 100))).toFixed(2).replace('.', ',')}</h1>
                            </div>
                            </div>
                        )}
                        {!productData.promocao && (
                            <h1 className='text-4xl md:text-3xl whitespace-nowrap overflow-hidden text-ellipsis' title={`R$ ${Number(productData.valor).toFixed(2)}`}>R$ {Number(productData.valor).toFixed(2).replace('.', ',')}</h1>
                        )}
                        {acquired && (
                            <button disabled className='p-2 bg-zinc-300 rounded-sm shadow-sm'>Adquirido</button>
                        )}
                        {!acquired && (
                            <div className='flex items-center'>
                                {buttonIsLoading && (
                                    <>
                                    <button className='w-full p-2 bg-zinc-300 rounded-sm shadow-md' disabled onClick={handleOnClick}>Comprar</button>
                                    <Loading/>
                                    </>
                                )}
                                {!buttonIsLoading && (
                                    <button className='w-full p-2 bg-orange-400 hover:bg-orange-500 rounded-sm shadow-md' onClick={handleOnClick}>Comprar</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-4 overflow-hidden'>
                    <h1 className='w-fit max-w-full p-2 bg-orange-400 rounded-sm shadow-md text-white text-5xl lg:text-3xl md:text-2xl sm:text-lg uppercase whitespace-nowrap overflow-hidden text-ellipsis' title={productData.nome}>{productData.nome}</h1>
                    {productIsLoading && <Loading/>}
                    <p className='text-lg md:text-base'>{productData.descricao}</p>
                </div>
                <span className='text-sm py-1 px-2 bg-orange-400 text-white font-mono uppercase w-fit h-fit lg:hidden sm:block'>{productData.categoria}</span>
            </div>
        </div>
    );
}