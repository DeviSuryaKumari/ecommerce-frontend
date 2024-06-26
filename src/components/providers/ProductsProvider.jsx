import { createContext, useReducer } from "react";

export const ProductsContext = createContext(null);
export const ProductsDispatchContext = createContext(null);

const initialProducts = JSON.parse(localStorage.getItem('products'))?.length === 0 ? [] : JSON.parse(localStorage.getItem('products'));

export const ProductsProvider = ({ children }) => {
    const [productsContext, productsDispatch] = useReducer(productsReducer, initialProducts);

    return <ProductsContext.Provider value={productsContext}>
        <ProductsDispatchContext.Provider value={productsDispatch}>
            {children}
        </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
}

const productsReducer = (currentProducts, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS': return action.payload.products;
        case 'EMPTY_PRODUCTS': return [];
        default: return currentProducts;
    }
}