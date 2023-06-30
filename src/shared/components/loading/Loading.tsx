import { Loader2 } from "lucide-react";

export const Loading = () => {
    return(
        <div className='text-orange-400 h-fit w-fit animate-spin'>
            <Loader2 size={32} strokeWidth={1.5}/>
        </div>
    );
}