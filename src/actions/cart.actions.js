export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const ADD_TO_AVAILABLE_IN_CART = 'ADD_TO_AVAILABLE_IN_CART';
export const REMOVE_FROM_AVALAIBLE_IN_CART = 'REMOVE_FROM_AVALAIBLE_IN_CART';

export const getCartItems = () => ({type: GET_CART_ITEMS});
export const removeFromCart = newProducts => ({type: REMOVE_FROM_CART, newProducts});
export const addItemToCard = payload => ({ type: ADD_ITEM_TO_CART, inCart: payload});
export const addToAvalaibleInCart = newProducts => ({ type: ADD_TO_AVAILABLE_IN_CART, newProducts});
export const removeFromAvailableInCart = newProducts => ({ type: REMOVE_FROM_AVALAIBLE_IN_CART, newProducts})