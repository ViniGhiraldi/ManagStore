import { useEffect, useMemo, useState } from "react";
import { ProdutosUsuariosService } from "../../shared/services/api/produtos-usuario/ProdutosUsuariosService";
import { Card, Loading } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { useSearchParams } from "react-router-dom";
import { IProduto } from "../../shared/services/models";
import { ListViewLayout } from "../../shared/layouts/ListViewLayout";

export const MyProducts = () => {
    const [products, setProducts] = useState<IProduto[]>([]);
    const [pagination, setPagination] = useState<number[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    
    const page = useMemo(() => {
        return Number(searchParams.get('page')) || 1;
    }, [searchParams]);

    const handleDelete = (id: number, nome: string) => {
        setIsLoading(true);
        ProdutosUsuariosService.deleteById(id).then(result => {
            setIsLoading(false);
            if(result instanceof Error){
                console.log(result.message);
            }else{
                setProducts(oldProducts => oldProducts.filter((produto) => produto.id !== id))
                alert(nome + ' reembolsado com sucesso!');
            }
        })
    }

    useEffect(() => {
        setPagination([]);
        setIsLoading(true);
        ProdutosUsuariosService.getAll(page).then(result => {
            setIsLoading(false);
            if(result instanceof Error){
                console.log(result)
            }else{
                const paginationNumber = Math.ceil(result.totalCount / Environment.LIMIT) + 1;

                for (let i = 1; i < paginationNumber; i++) {
                    setPagination(oldPagination => [...oldPagination, i]);
                }

                setProducts(result.data);
                setTotalCount(result.totalCount);
            }
        })
    }, [page])

    return(
        <ListViewLayout
        listData={products.map((produto, i) => (
            <Card
            key={i}
            name={produto.nome}
            category={produto.categoria}
            image={produto.foto}
            description={produto.descricao}
            cardBodyCustomization='bg-zinc-200 w-60 sm:w-48'
            imageCustomization='h-56'
            valueCustomization={(produto.promocao && produto.promocao > 0) ? 'text-sm sm:text-xs' : 'text-xl sm:text-base'}
            promotionCustomization='text-xl sm:text-base'
            textButton='Reembolsar'
            onClick={() => handleDelete(produto.id, produto.nome)}
            disabled={isLoading}
            />
        ))}
        page={page}
        pagination={pagination}
        >
            <div className='flex items-center gap-2 sm:justify-center'>
                <span className='capitalize p-2 bg-orange-400 rounded-sm shadow-md'>
                    Total de produtos
                </span>
                <span className='bg-black/10 p-2 rounded-sm'>
                    {totalCount}
                </span>
                {isLoading && <Loading/>}
            </div>
        </ListViewLayout>
    );
}