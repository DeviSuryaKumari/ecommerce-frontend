import { useContext, useEffect, useReducer } from "react";
import { Link, useLocation } from "react-router-dom";
import './allProducts.scss';
import { ProductsContext } from "./providers/ProductsProvider";
import { selectedProductReducer } from "../reducer";
import ProductDetails from './ProductDetails';

const AllProducts = (props) => {
    let location = useLocation();
    const productsContext = useContext(ProductsContext);

    const [selectedProduct, selectedProductDispatch] = useReducer(selectedProductReducer, {});

    useEffect(() => {
        if (location.search === '') {
            selectedProductDispatch({
                type: 'SET_SELECTED_PRODUCT',
                payload: {
                    selectedProduct: {}
                }
            });
        } else if (location.search.includes("?id=")) {
            const productId = parseInt(location.search.substring(location.search.lastIndexOf("=") + 1));
            const filteredProduct = (productsContext.filter((product) => product.productId === productId))[0];
            selectedProductDispatch({
                type: 'SET_SELECTED_PRODUCT',
                payload: {
                    selectedProduct: filteredProduct
                }
            });
        }
    }, [location]);

    return !selectedProduct?.productId ?
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity Available</th>
                </tr>
            </thead>
            <tbody>
                {productsContext && productsContext.map((product) => (
                    <tr key={product.productId}>
                        <td><Link to={'/products?id=' + product.productId}>{product.name}</Link></td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.quantityAvailable}</td>
                    </tr>
                ))}
            </tbody>
        </table> : <ProductDetails product={selectedProduct} />;
}

export default AllProducts;