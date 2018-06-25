export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const ADD_TO_CART = 'ADD_TO_CART';

export const getProductList = () => ({type: GET_PRODUCT_LIST});
export const addToCard = payload => ({type: ADD_TO_CART, payload});