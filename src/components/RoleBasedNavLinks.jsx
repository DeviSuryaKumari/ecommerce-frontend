import { useContext, useReducer } from "react";
import { UserContext } from "./providers/UserProvider";
import { Link } from "react-router-dom";
import { sellerActionReducer } from '../reducer';

const RoleBasedNavLinks = () => {
    const userContext = useContext(UserContext);
    const [sellerActionVal, sellerActionDispatch] = useReducer(sellerActionReducer, '');

    const handleSellerAction = (sellerAction) => {
        switch (sellerAction) {
            case 'ADD_PRODUCT': {
                sellerActionDispatch({ type: 'ADD_PRODUCT' });
                break;
            }
            case 'DELETE_PRODUCT': {
                sellerActionDispatch({ type: 'DELETE_PRODUCT' });
                break;
            }
            case 'SEE_MY_ORDERS': {
                sellerActionDispatch({ type: 'SEE_MY_ORDERS' });
                // fetch('http://ecommerce-app036.wl.r.appspot.com/api/orders/seller/' + userContext.userId, {
                //     headers: {
                //         Accept: '*/*',
                //         'Content-Type': 'application/json'
                //     }
                // }).then((response) => {
                //     if (response.ok) {
                //         response.json().then((result) => {
                //             // setSellerProducts
                //         });
                //     }
                // });
                break;
            }
            default: return;
        }
    }

    return <>
        {userContext.role === 'SELLER' ?
            <>
                <li className="header-link-list__item nav-item">
                    <Link to="/seller/product" onClick={() => handleSellerAction('ADD_PRODUCT')} className="nav-link active">
                        <b className="text-primary">Add Product</b>
                    </Link>
                </li>
                <li className="header-link-list__item nav-item">
                    <Link to="/seller/product" onClick={() => handleSellerAction('DELETE_PRODUCT')} className="nav-link active">
                        <b className="text-primary">Delete Product</b>
                    </Link>
                </li>
                <li className="header-link-list__item nav-item">
                    <Link to="/seller/orders" onClick={() => handleSellerAction('SEE_MY_ORDERS')} className="nav-link active">
                        <b className="text-primary">All Orders</b>
                    </Link>
                </li>
            </> :
            <>
                <li className="header-link-list__item nav-item">
                    <Link to="/products" className="nav-link active">
                        <b className="text-primary">All Products</b>
                    </Link>
                </li>
            </>
        }
    </>
}

export default RoleBasedNavLinks;