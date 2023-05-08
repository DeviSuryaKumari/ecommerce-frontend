import { useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import './allProducts.scss';
import { ProductsContext, ProductsDispatchContext } from "./providers/ProductsProvider";
import { selectedProductReducer } from "../reducer";

const AllProducts = () => {
    const productsContext = useContext(ProductsContext);
    const productsDispatch = useContext(ProductsDispatchContext);

    const [selectedProduct, selectedProductDispatch] = useReducer(selectedProductReducer, {});

    useEffect(() => {
        fetch("http://localhost:8080/api/products/", {
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((result) => {
                    // setProducts(() => result);
                    productsDispatch({
                        type: 'SET_PRODUCTS',
                        payload: {
                            products: result
                        }
                    })
                });
            }
        })
    }, []);

    const handleProductClick = (product) => {
        selectedProductDispatch({
            type: 'SET_SELECTED_PRODUCT',
            payload: {
                selectedProduct: product
            }
        });
    }

    return <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity Available</th>
            </tr>
        </thead>
        <tbody>
            {productsContext.map((product) => (
                <tr key={product.productId}>
                    <td><Link to={'/products?id=' + product.productId} onClick={() => handleProductClick(product)}>{product.name}</Link></td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.quantityAvailable}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default AllProducts;