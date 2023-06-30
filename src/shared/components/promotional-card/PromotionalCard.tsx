interface IPromotionalCard{
    cardBodyCustomization?: string;
    productName: string;
    text?: string;
    textCustomization?: string
    productNameCustomization?: string;
    productImage: string;
    productImageCustomization?: string;
    textButton: string;
    onClick: () => void;
}

export const PromotionalCard = ({
    productName, 
    productImage,
    text = 'Veja mais sobre',
    textButton, 
    cardBodyCustomization, 
    productNameCustomization,
    textCustomization,
    productImageCustomization,
    onClick
}: IPromotionalCard) => {
    return(
        <div className={`flex sm:flex-col justify-evenly gap-10 items-center p-24 px-10 ${cardBodyCustomization}`}>
            <img className={`h-56 max-w-xs rounded-md shadow-2xl shadow-black/50 ${productImageCustomization}`} src={productImage} alt={productName} />
            <div className='flex flex-col items-center gap-10'>
                <span className={`text-5xl md:text-4xl py-2 font-bold max-w-md md:max-w-xs text-center sm:hidden ${textCustomization}`}>
                    {text}
                    <p className={`text-6xl font-sans whitespace-nowrap overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-black/50 scrollbar-thumb-white hover:scrollbar-thumb-white/80 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm ${productNameCustomization}`} title={productName}>
                        {productName}
                    </p>
                </span>
                <button className='bg-white px-8 py-4 w-fit md:w-full rounded-md shadow-md hover:bg-white/80 hover:shadow-lg' onClick={onClick}>
                    <span className='text-xl font-semibold font-sans line-clamp-1'>
                        {textButton}
                    </span>
                </button>
            </div>
        </div>
    );
}