import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface IPagination{
    page: number;
    paginationNumberArray: number[];
}

export const Pagination = ({page, paginationNumberArray}: IPagination) => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(paginationNumberArray.length);

    if(paginationNumberArray.length < 2) return <></>;

    return(
        <div className='flex items-center gap-1 self-center text-sm sm:text-xs'>
            <a
                href='#top'
                onClick={
                    () => {
                        (page > 1)
                            ?
                            setSearchParams({ page: (page - 1).toString() }, { replace: true })
                            :
                            setSearchParams({ page: paginationNumberArray.length.toString() }, { replace: true })
                    }}
            >
                <ChevronLeft size={20} strokeWidth={1.5}/>
            </a>
            {paginationNumberArray.map((paginationNumber, i) => paginationNumber < 6 && (
                <a
                    href='#top'
                    key={i}
                    className={`p-2 rounded-full hover:bg-orange-400 hover:text-white ${searchParams.get('page') === paginationNumber.toString() && 'bg-orange-400 text-white'}`}
                    onClick={() => setSearchParams({ page: paginationNumber.toString() }, { replace: true })}
                >
                    {paginationNumber}
                </a>
            ))}
            {paginationNumberArray.length > 5 && (
                <a
                    href='#top'
                    className='p-2 rounded-full'
                >
                    ...
                </a>
            )}
            <a
                href='#top'
                onClick={
                    () => {
                        (page < paginationNumberArray.length)
                            ?
                            setSearchParams({ page: (page + 1).toString() }, { replace: true })
                            :
                            setSearchParams({ page: '1' }, { replace: true })
                    }}
            >
                <ChevronRight size={20} strokeWidth={1.5}/>
            </a>
        </div>
    );
}