interface ICardProps{
    cardBodyCustomization?: string;
    imageCustomization?: string;
    image: string;
    name: string;
    showValue?: boolean;
    value?: number;
    promotion?: number;
    description?: string;
    promotionCustomization?: string;
    valueCustomization?: string;
    category: string;
    textButton: string;
    onClick: () => void;
    disabled?: boolean;
}

export const Card = ({cardBodyCustomization, imageCustomization, valueCustomization, promotionCustomization, category, image, name, value = 0, showValue = false, description = '', promotion = 0, textButton = 'Ver mais', onClick, disabled = false}: ICardProps) => {
    return(
        <div className={`flex flex-col items-center gap-2 bg-white shadow-md rounded-md p-4 ${cardBodyCustomization}`}>
            <span className='text-xs font-bold uppercase whitespace-normal line-clamp-1 self-start w-full'>
                {category[0].toUpperCase() + category.substring(1)}
            </span>
            <img className={imageCustomization} src={image} alt={name} />
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex items-center justify-between gap-2'>
                    <span className='text-lg font-semibold whitespace-normal break-words line-clamp-2' title={name}>
                        {name}
                    </span>
                    {promotion > 0 && showValue && (
                        <span className='px-2 bg-green-500 rounded-sm shadow-md'>
                            -{promotion}%
                        </span>
                    )}
                </div>
                <div className='flex items-center gap-2'>
                    {showValue && (
                        <>
                        <span className={`whitespace-normal line-clamp-1 ${valueCustomization} ${promotion > 0 && 'line-through'}`} title={`R$ ${value.toFixed(2)}`}>
                            R$ {value.toFixed(2).replace('.', ',')}
                        </span>
                        {promotion > 0 && (
                            <span className={`whitespace-normal line-clamp-1 ${promotionCustomization}`} title={(value - (value * (promotion / 100))).toFixed(2)}>
                                R$ {(value - (value * (promotion / 100))).toFixed(2).replace('.', ',')}
                            </span>
                        )}
                        </>
                    )}
                    {!showValue && (
                        <span className='max-h-12 overflow-y-auto text-xs scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-black/20 hover:scrollbar-thumb-black/30 scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
                            {description}
                        </span>
                    )}
                </div>
                {!disabled && (
                    <button className='capitalize p-2 rounded-md shadow-md bg-orange-400 hover:bg-orange-500 text-white' onClick={onClick}>
                        {textButton}
                    </button>
                )}
                {disabled && (
                    <button className='capitalize p-2 rounded-md shadow-md bg-black/50 text-white' disabled>
                        {textButton}
                    </button>
                )}
            </div>
        </div>
    );
}