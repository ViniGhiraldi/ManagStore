import { Route, Routes } from "react-router-dom";
import { ErrorPage, Home, Login, MyProducts, Product, Register, Store } from "../pages";
import { useAuthContext } from "../shared/contexts";

export const AppRoutes = () => {
    const {isAuthenticated} = useAuthContext();

    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products/:product' element={<Store/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            
            {!isAuthenticated && (
                <>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                </>
            )}

            {isAuthenticated && (
                <>
                <Route path='/my' element={<h1>My</h1>}/>
                <Route path='/my/products' element={<MyProducts/>}/>
                </>
            )}

            <Route path='*' element={<ErrorPage/>}/>
        </Routes>
    );
}