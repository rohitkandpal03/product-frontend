import { addProductDetails, pagiantedProduct, searchDate, searchProduct, totalProducts } from "../ApiCall/ApiCall";
import { CLEAR_PRODUCT_STATUS, GET_PRODUCT, GET_SEARCH_PRODUCT, LOAD_PRODUCT, PRODUCT_ADD, TOTAL_PRODUCT } from "./Action"


export const addProduct = ( productData ) => async( dispatch ) => {

    dispatch({ type: LOAD_PRODUCT })
    const productStatus = await addProductDetails(productData);
    dispatch({ 
        type: PRODUCT_ADD , 
        data: productStatus.data, 
        status: productStatus.status, 
        addedProduct: productData
    });
    
}

export const clearProductStatus = () => async( dispatch ) => {

    dispatch({ type: CLEAR_PRODUCT_STATUS })
}

export const searchProductDate = ( date, searchData ) => async( dispatch ) => {

    dispatch({ type: LOAD_PRODUCT, data: []})
     const product = await searchDate( date, searchData );
     dispatch({ 
        type: GET_SEARCH_PRODUCT, 
        data: product.data, 
        status: product.sucess,
    })

}

export const searchProductName = ( prName, date ) => async( dispatch ) => {

    const productDetail = await searchProduct( prName, date );
    dispatch({ 
        type: GET_SEARCH_PRODUCT, 
        data: productDetail.data,
    })
}

export const getTotalProducts = () => async( dispatch ) => {

    const totalProduct = await totalProducts();
    dispatch({
        type: TOTAL_PRODUCT,
        data: totalProduct
    })
}

export const paginate = ( page, perPage ) => async( dispatch ) => {

    const perPageProduct = await pagiantedProduct( page, perPage );
    dispatch({
        type: GET_PRODUCT,
        data: perPageProduct
    })
}
