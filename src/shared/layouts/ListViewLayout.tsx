import { Pagination } from "../components";

interface IListViewLayout{
    listData: JSX.Element[];
    page: number;
    pagination: number[];
    children?: React.ReactNode;
}

export const ListViewLayout = ({listData, page, pagination, children}: IListViewLayout) => {
    return(
        <div className='p-10 pt-20 sm:px-0 flex flex-col flex-1 gap-4'>
            {children}
            <div className='flex flex-col flex-1 gap-4 bg-white rounded-lg sm:rounded-none shadow-md p-8'>
                <ul className='flex flex-wrap justify-center items-start gap-8'>
                    {listData}
                </ul>
                {listData.length < 1 && (
                    <div className='flex flex-1 items-center justify-center'>
                        <h1 className='text-4xl sm:text-2xl line-clamp-1'>
                            Sem Resultados
                        </h1>
                    </div>
                )}
                <Pagination page={page} paginationNumberArray={pagination}/>
            </div>
        </div>
    );
}