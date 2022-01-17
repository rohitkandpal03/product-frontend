import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearProductStatus, getTotalProducts, paginate, searchProductDate, searchProductName } from '../Action/ProductActionCreator';
import AddProductListModal from '../Modal/AddProductListModal';
import StatusModal from '../Modal/StatusModal';
import Pagination from './Pagination';

const randomHexaId = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const productDialog = 'productDialog';
const productStatusDialog = 'productStatusDialog';

export const perPage = 5;

const ProductList = () => {
    const [ currentPage, setCurrentPage ] = useState(1);

    const [ showPopUp, setShowPopUp ] = useState(false);
    const [ productData, setProductData ] = useState([]);
    const [ showStatusDialog , setStatusDialog ] = useState(false);
    const [ date , setDate ] = useState('');
    const [ searchData , setSearchData ] = useState('');

    const dispatch = useDispatch();
    const productStatus = useSelector( state => state.productAddStatus );
    const products = useSelector( state => state.products);

    useEffect(() => {
        dispatch(getTotalProducts());
    },[]);

    useEffect(() => {
        if(productStatus){
            setShowPopUp(false);
            setStatusDialog(true);
        }
       setProductData(products); 
    }, [ productStatus, products ])


    useEffect(() => {
        
        dispatch(paginate(currentPage, perPage));
  
    }, [ currentPage, dispatch ]);

    const onDateChange = (e) => {
        setDate(e.target.value);
        if(e.target.value){
            dispatch(searchProductDate(e.target.value, searchData))
        }
        else if( !e.target.value && searchData){
            dispatch(searchProductName( searchData ));
        }
        else{
            dispatch(paginate(currentPage, perPage));
            dispatch(getTotalProducts());
        }  
    }

    const onSearchHandler = (e) => {
        setSearchData(e.target.value);
        if(e.target.value){  
            dispatch(searchProductName(e.target.value, date));
        }
        else if( !e.target.value && date){    
            dispatch(searchProductDate( date ))
        }
        else{
            dispatch(paginate(currentPage, perPage));
            dispatch(getTotalProducts());
        }
    }

    const showPopUpHandler = () => {
        setShowPopUp(true);
    }

    const hidePopUpHandler = (field) => {
        if(field === productDialog){
            setShowPopUp(false);
        }else if( field === productStatusDialog){
            setStatusDialog(false);
            dispatch(clearProductStatus());
        }
        
    }

    const saveProductHandler = (products) => {

        const id = randomHexaId(8);
        const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        
        if( products.productName && products.amount && products.description ){
            dispatch(addProduct({
                id,
                createdAt: currentDate,
                updatedAt: currentDate,
                ...products
            }))
            setTimeout(() => {
                dispatch(paginate(currentPage, perPage));
                dispatch(getTotalProducts());
            }, 100);
            
        }      
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-default bg-primary' style={{height: 55}} >
                    <div className="container-fluid">
                        <div className="navbar-header">
                          <h2 className='text-white'>ProductList</h2>
                        </div>
                    </div>
                </nav>
                <div className={"d-flex flex-row justify-content-between m-4"}>
                   <div className="md-form md-outline input-with-post-icon datepicker">
                    <input 
                        type="date" 
                        id="date"
                        onChange={ onDateChange }
                        className="form-control"
                     />
                    </div>
                    <div>
                    <input 
                      type="search" 
                      placeholder='Search'
                      onChange={ onSearchHandler}
                      className="form-control" 
                      id="datatable-search-input"
                    />
                    </div>
                </div>
            </header>
          <div className='container'>
          <button className="btn btn-primary" onClick={ () => showPopUpHandler(productDialog) }>
            <span>+</span> Add
          </button>
            {
               showStatusDialog && 
               <StatusModal
                    productStatus = { productStatus }
                    onHide = { () => hidePopUpHandler(productStatusDialog)} 
                />
            }
            {
                showPopUp && 
                <AddProductListModal 
                  onHide = { () => hidePopUpHandler(productDialog) }
                  onSave = { saveProductHandler}
                />
            }
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ProductName</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>

                <tbody>        
                    {
                    productData.length !== 0 &&
                    productData.map(( prData, i ) => (<tr key={`${prData.productName}${i}`}>
                        <td className='text-wrap text-break'>
                            {prData.productName}
                        </td>
                        <td className='text-wrap text-break'>
                            {prData.amount}
                        </td>
                        <td className='text-wrap text-break'>
                            {prData.description}
                        </td>
                    </tr>  
                    ))
                    }
                </tbody>
                
            </table>
            {
                productData.length === 0 && 
                <h2 className='d-flex justify-content-center'> No Product Found </h2>
            }
            { 
            productData.length !==0 && <nav>
               <Pagination 
                currentPage={currentPage}
                perPage = {perPage}
                setCurrentPage = {setCurrentPage}
               />
            </nav>
            }
          </div>
        </div>
    );
}

export default ProductList;