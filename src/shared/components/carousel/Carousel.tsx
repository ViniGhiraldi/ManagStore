import { useRef } from "react";
import { Environment } from "../../environment";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ICarouselProps{
    cards: React.ReactNode[];
    cardsGap: number;
    cardWidthDefault: number;
    cardWidthSm?: number;
    cardWidthMd?: number;
    cardWidthLg?: number;
    cardWidthXl?: number;
    cardWidth2Xl?: number;
    carouselBodyCustomization?: string;
}

export const Carousel = ({ cards, cardsGap, cardWidthDefault, cardWidthSm, cardWidthMd, cardWidthLg, cardWidthXl, cardWidth2Xl, carouselBodyCustomization }: ICarouselProps) => {
    const carouselUl = useRef<HTMLUListElement>(null);

    const scrollLeft = () => {
        if(cardWidthSm && innerWidth < 640){
            carouselUl.current!.scrollLeft -= (cardWidthSm + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidthMd && innerWidth < 768){
            carouselUl.current!.scrollLeft -= (cardWidthMd + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidthLg && innerWidth < 1024){
            carouselUl.current!.scrollLeft -= (cardWidthLg + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidthXl && innerWidth < 1280){
            carouselUl.current!.scrollLeft -= (cardWidthXl + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidth2Xl && innerWidth < 1536){
            carouselUl.current!.scrollLeft -= (cardWidth2Xl + cardsGap) * Environment.SPACING_PROPORTION;
        }else{
            carouselUl.current!.scrollLeft -= (cardWidthDefault + cardsGap) * Environment.SPACING_PROPORTION;
        }
    }

    const scrollRight = () => {
        if(cardWidthSm && innerWidth < 640){
            carouselUl.current!.scrollLeft += (cardWidthSm + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidthMd && innerWidth < 768){
            carouselUl.current!.scrollLeft += (cardWidthMd + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidthLg && innerWidth < 1024){
            carouselUl.current!.scrollLeft += (cardWidthLg + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidthXl && innerWidth < 1280){
            carouselUl.current!.scrollLeft += (cardWidthXl + cardsGap) * Environment.SPACING_PROPORTION;
        }else if(cardWidth2Xl && innerWidth < 1536){
            carouselUl.current!.scrollLeft += (cardWidth2Xl + cardsGap) * Environment.SPACING_PROPORTION;
        }else{
            carouselUl.current!.scrollLeft += (cardWidthDefault + cardsGap) * Environment.SPACING_PROPORTION;
        }
    }

    return(
        <section className={`flex items-center w-full ${carouselBodyCustomization}`}>
            <div className='cursor-pointer' onClick={scrollLeft}>
                <ChevronLeft size={32} strokeWidth={1}/>
            </div>
            <ul className={`flex flex-1 py-2 whitespace-nowrap overflow-x-auto scrollbar-hide scroll-smooth gap-${cardsGap.toString()}`} ref={carouselUl}>
                {cards.map((card, i) => (
                    <li key={i} className='flex items-center'>{card}</li>
                ))}
            </ul>
            <div className='cursor-pointer' onClick={scrollRight}>
                <ChevronRight size={32} strokeWidth={1}/>
            </div>
        </section>
    );
}