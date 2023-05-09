import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './allProducts.scss';
import { selectedProductReducer } from "../reducer";
import ProductDetails from './ProductDetails';
import { UserContext } from "./providers/UserProvider";

const AllSellerProducts = () => {
    let location = useLocation();
    const [products, setProducts] = useState([]);
    const userContext = useContext(UserContext);
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
            const filteredProduct = (products.filter((product) => product.productId === productId))[0];
            selectedProductDispatch({
                type: 'SET_SELECTED_PRODUCT',
                payload: {
                    selectedProduct: filteredProduct
                }
            });
        }
    }, [location]);

    useEffect(() => {
        fetch("http://ecommerce-app036.wl.r.appspot.com/api/products/seller/" + userContext.userId, {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((result) => {
                    setProducts(() => result)
                });
            }
        });
    }, []);

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
                {products && products.map((product) => (
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

export default AllSellerProducts;