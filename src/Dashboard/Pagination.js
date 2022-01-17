import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { paginate } from "../Action/ProductActionCreator";
import './Pagination.css';

const Pagination = ({ currentPage, perPage, setCurrentPage }) => {
    const [ totalCount, setTotalCount ] = useState([]);
    const [ page, setPage ] = useState(1);

    const totalProductCount = useSelector( state => state.totalProducts);
    const dispatch = useDispatch();
    let indexOfLastProduct, indexOfFirstProduct, currentProduct=[];
    
    useEffect(()=> {
        if(totalProductCount){
            const count = [...Array(totalProductCount)].map((pr,i) => {
                return i+1;
            } )
            setTotalCount(count);
        }
    }, [totalProductCount])

    useEffect(() => {
        if((currentPage > (page * perPage)) && (currentPage <= totalProductCount)){
            console.log("working or not")
            setPage(page+1);
       }
       else if((currentPage <= (page * perPage)-perPage)){
           setPage(page-1);
       }
    }, [currentPage])


    if( totalCount.length > 0 ){
        indexOfLastProduct = page * perPage;
        indexOfFirstProduct = indexOfLastProduct - perPage;
        currentProduct = totalCount.slice(indexOfFirstProduct, indexOfLastProduct);
    }

    const pageNumberHandler = (pageNo) => {
        setCurrentPage(pageNo);
    }

    const onPreviousHandler = () => {
        setCurrentPage( currentPage - 1 );
    }

    const onNextHandler = () => {
        setCurrentPage( currentPage + 1 );
    }
 
    const renderProduct = currentProduct.map((product, i) => {
        return ( 
        <button 
         className={` ${currentPage === product ? 'active': ''}`} 
         key={i} 
         onClick={() => pageNumberHandler(product)} 
         >
          {product}
        </button>)
    });

    return <ul className="pagination d-flex justify-content-center">
    <button
        onClick={onPreviousHandler}
        disabled = {currentPage === 1}
    >
        Previous
    </button>
    {
      renderProduct
    }
    <button 
        disabled={ currentPage === totalProductCount } 
        onClick={onNextHandler}
    >
        Next
    </button>
  </ul>
}

export default Pagination;

