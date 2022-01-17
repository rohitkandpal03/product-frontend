import { combineReducers } from "redux";
import { 
    CLEAR_PRODUCT_STATUS,
    DEFAULT_CREDENTIAL, 
    GET_PRODUCT, 
    GET_SEARCH_PRODUCT, 
    GET_USER, 
    LOAD_PRODUCT, 
    LOAD_USER, 
    PRODUCT_ADD, 
    TOTAL_PRODUCT
} from "../Action/Action";

const defaultCred = (state = {}, action) => {

    if( action.type === DEFAULT_CREDENTIAL ){
        return { name: 'Rohit', password: '123456'}
    }
    return state;
}

const loadingData = ( state = false, action ) => {
    switch( action.type ) {
        case LOAD_PRODUCT:
        case LOAD_USER: 
            return true;
        case PRODUCT_ADD:
        case GET_USER:
        case GET_PRODUCT:
            return false;
        default:
            return state;
    }
}

const productAddStatus = ( state = '', action ) => {
    switch( action.type ){
        case LOAD_PRODUCT:
        case CLEAR_PRODUCT_STATUS:
            return '';
        case PRODUCT_ADD:
            return action.data;
        default:
            return state;
    }  
}

const user = ( state = {}, action ) => {
    if( action.type === GET_USER ){
        return action.data
    }
    return state;
}

const products = ( state = [], action ) => {
    switch( action.type ){
        case GET_PRODUCT:
            return action.data;
        case GET_SEARCH_PRODUCT:
            return action.data.products; 
        default:
            return state;
    }
}

const totalProducts = ( state = null, action ) => {
    switch( action.type ){
        case GET_SEARCH_PRODUCT:
        case TOTAL_PRODUCT:
            return action.data.totalLength;
        default:
            return state;
    }
}

const RootReducer = combineReducers({
    defaultCred,
    loadingData,
    user,
    productAddStatus,
    products,
    totalProducts,
});

export default RootReducer;