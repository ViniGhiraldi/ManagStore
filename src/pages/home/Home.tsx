import { useEffect, useState } from "react";
import { Card, Carousel, PromotionalCard } from "../../shared/components";
import { ProdutosService } from "../../shared/services/api/produtos/ProdutosService";
import { Book, Gamepad2 } from "lucide-react";
import { IProduto } from "../../shared/services/models";

export const Home = () => {
    const [promotionProduct, setPromotionProduct] = useState<{id: number; nome: string; foto: string;}>({id: 0, nome: '', foto: ''});
    const [carouselProducts, setCarouselProducts] = useState<IProduto[]>([]);
    const [listProducts, setListProducts] = useState<IProduto[]>([]);

    useEffect(() => {
        ProdutosService.getAll().then(result => {
            if(result instanceof Error){
                console.log(result.message);
            }else{
                setPromotionProduct({id: result.data[0].id, nome: result.data[0].nome, foto: result.data[0].foto});
                
                setCarouselProducts(result.data);
            }
        })
        ProdutosService.getAll(1, '', 'livros').then(result => {
            if(result instanceof Error){
                console.log(result.message);
            }else{
                setListProducts(result.data);
            }
        })
    }, [])

    return(
        <>
            <PromotionalCard
            productName={promotionProduct.nome}
            productImage={promotionProduct.foto}
            onClick={() => location.href = `/product/${promotionProduct.id}`}
            textButton='Comprar Agora'
            productNameCustomization='text-zinc-900'
            productImageCustomization='animate-bounce'
            cardBodyCustomization='pt-48 bg-gradient-to-r from-orange-400 to-orange-600'
            textCustomization='text-white'
            />
            <div className='p-10 sm:p-4 space-y-10'>
                <div className='space-y-4'>
                    <h1 className='text-3xl font-bold uppercase font-sans'>Conheça nossos produtos!</h1>
                    <Carousel
                        cards={carouselProducts.map((produto, i) => (
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
                            onClick={() => location.href = `/product/${produto.id}`}
                            />
                        ))}
                        cardWidthDefault={60}
                        cardsGap={10}
                        cardWidthSm={48}
                    />
                </div>

                <div className='flex flex-col gap-4 items-center'>
                    <h1 className='text-xl text-black/50'>Navegue por categoria</h1>
                    <div className='flex gap-8 max-w-full overflow-x-auto'>
                        <a href='/products/livros?page=1' className='text-center'>
                            <div className='p-4 rounded-full bg-black/20'>
                                <Book size={32} />
                            </div>
                            <span className='font-mono text-sm font-bold text-black/50'>Livros</span>
                        </a>
                        <a href='/products/jogos?page=1' className='text-center'>
                            <div className='p-4 rounded-full bg-black/20'>
                                <Gamepad2 size={32} />
                            </div>
                            <span className='font-mono text-sm font-bold text-black/50'>Jogos</span>
                        </a>
                    </div>
                </div>

                <div className='space-y-4'>
                    <h1 className='text-3xl italic font-sans font-semibold'>Gosta de uma boa leitura?</h1>
                    <ul className='flex flex-wrap justify-evenly items-start gap-8'>
                        {listProducts.map((produto, i) => (
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
                            onClick={() => location.href = `/product/${produto.id}`}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <PromotionalCard
            productName={promotionProduct.nome}
            productImage={promotionProduct.foto}
            onClick={() => location.href = `/product/${promotionProduct.id}`}
            textButton='Comprar Agora'
            productNameCustomization='text-zinc-900'
            cardBodyCustomization='bg-gradient-to-r from-orange-400 to-orange-600'
            textCustomization='text-white'
            />
        </>
    );
}