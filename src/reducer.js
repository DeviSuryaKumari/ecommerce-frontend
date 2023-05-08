export const sellerActionReducer = (sellerAction, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT': return 'ADD_PRODUCT';
        case 'DELETE_PRODUCT': return 'DELETE_PRODUCT';
        case 'SEE_MY_ORDERS': return 'SEE_MY_ORDERS';
        default: return '';
    }
}

export const selectedProductReducer = (currentSelectedProduct, action) => {
    switch (action.type) {
        case 'SET_SELECTED_PRODUCT': return action.payload.selectedProduct;
        default: return currentSelectedProduct;
    }
}