import axios from 'axios';
import { appUrl } from '../envUrl';

export const userAuthentication = (userDetail) => {
  
    return axios.get(`${appUrl}/user/userDetail`, {
        params: {userDetail}
    }
    ).then(response => response.data)
    .catch(err => ({ sucess: false, data: err.message }));

}

export const addProductDetails = ( productData ) => {

    return axios.post(`${appUrl}/product/add`, {
        productDetail: productData
    }).then( response => ({ status: true, data: response.data }) )
    .catch( err => ({ status: false, data: 'Something went\'s wrong.' }) )
}

export const allProduct = () => {

    return axios.get(`${appUrl}/product`)
        .then( response => response.data )
        .catch( error => error.message );
}

export const searchDate = ( date, searchData ) => {

    return axios.get(`${appUrl}/product/searchDate`, {
        params: { date, searchData }
    })
    .then( response => ({sucess: true, data: response.data}) )
    .catch( err => ({sucess: false, data: err.message}) )
}

export const searchProduct = ( searchPrName, date ) => {

    return axios.get(`${appUrl}/product/searchProduct`, {
        params: { searchPrName, date }
    })
    .then( response => ({sucess: true, data: response.data}) )
    .catch( err => ({sucess: false, data: err.message}) )

}

export const totalProducts = () => {

    return axios.get(`${appUrl}/product/totalProducts`)
        .then( response => response.data )
        .catch( err => err.message )

}

export const pagiantedProduct = ( page, perPage ) => {

    return axios.get(`${appUrl}/product/paginate`, {
        params: { page, perPage }
    })
    .then( response => response.data )
    .catch( err => err.message );
}