import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ProdutosService } from "../../shared/services/api/produtos/ProdutosService";
import { Card, Carousel, PromotionalCard } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { IProduto } from "../../shared/services/models";
import { ListViewLayout } from "../../shared/layouts/ListViewLayout";

export const Store = () => {
    const { product } = useParams<'product'>();
    const [products, setProducts] = useState<IProduto[]>([]);
    const [promotionProduct, setPromotionProduct] = useState<{id: number; nome: string; foto: string;}>({id: 0, nome: '', foto: ''});
    const [pagination, setPagination] = useState<number[]>([]);
    const [searchParams] = useSearchParams();

    const page = useMemo(() => {
        return Number(searchParams.get('page')) || 1;
    }, [searchParams])

    useEffect(() => {
        setPagination([]);
        if(product !== 'livros' && product !== 'jogos'){
            location.href = '/';
        }else{
            ProdutosService.getAll(page, '', product).then(result => {
                if(result instanceof Error){
                    console.log(result.message);
                }else{
                    const paginationNumber = Math.ceil(result.totalCount / Environment.LIMIT) + 1;
    
                    for (let i = 1; i < paginationNumber; i++) {
                        setPagination(oldPagination => [...oldPagination, i]);
                    }
    
                    setPromotionProduct(result.data[0]);
                    setProducts(result.data);
                }
            })
        }
    }, [product, page])

    return(
        <ListViewLayout
        listData={products.map((produto, i) => (
            <Card
            key={i}
            name={produto.nome}
            category={produto.categoria}
            image={produto.foto}
            showValue
            value={produto.valor}
            promotion={produto.promocao}
            textButton='Ver Mais'
            cardBodyCustomization='bg-zinc-200 w-60 sm:w-48'
            imageCustomization='h-56'
            valueCustomization={(produto.promocao && produto.promocao > 0) ? 'text-sm sm:text-xs' : 'text-xl sm:text-base'}
            promotionCustomization='text-xl sm:text-base'
            onClick={() => location.href =`/product/${produto.id}`}
            />
        ))}
        page={page}
        pagination={pagination}
        >
            {promotionProduct && (
                <>
                <div className='space-y-4'>
                    <h1 className='w-fit sm:w-full text-2xl text-center font-bold p-2 bg-orange-400 rounded-sm sm:rounded-none shadow-md'>Um pouco do que temos</h1>
                    <Carousel
                    cards={products.reverse().map((produto, i) => (
                        <Card
                        key={i}
                        name={produto.nome}
                        category={produto.categoria}
                        image={produto.foto}
                        showValue
                        value={produto.valor}
                        promotion={produto.promocao}
                        textButton='Ver Mais'
                        cardBodyCustomization='bg-zinc-200 w-60 sm:w-48'
                        imageCustomization='h-56'
                        valueCustomization={(produto.promocao && produto.promocao > 0) ? 'text-sm sm:text-xs' : 'text-xl sm:text-base'}
                        promotionCustomization='text-xl sm:text-base'
                        onClick={() => location.href =`/product/${produto.id}`}
                        />
                        ))}
                        cardWidthDefault={60}
                        cardsGap={10}
                        cardWidthSm={48}
                    />
                </div>
                <PromotionalCard
                productName={promotionProduct.nome}
                productImage={promotionProduct.foto}
                onClick={() => location.href =`/product/${promotionProduct.id}`}
                textButton='Comprar Agora'
                productNameCustomization='text-zinc-900'
                cardBodyCustomization='bg-gradient-to-r from-orange-400 to-red-500'
                textCustomization='text-white'
                />
                </>
            )}
        </ListViewLayout>
    );
}