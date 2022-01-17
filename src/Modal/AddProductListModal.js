
import React, { useState } from "react";
import './AddProductList.css';

const AddProductListModal = (props) => {

  const [ productName, setProductName ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ description, setDescription ] = useState('');

  const onSaveHandler = () => {
    props.onSave({ productName, amount, description });
  }

  return (
    <div className="modal d-inline fade show backdrop" id="ModalCenter" >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
        </div>
        <div className="modal-body">
            <div className={'form-outline mb-2'}>
              <input 
                type="text" 
                placeholder='Product Name'
                onChange={(event) => setProductName(event.target.value)}
                className="form-control form-control" />
            </div>
            <div className={'form-outline mb-2'}>
              <input 
                type="number" 
                placeholder='Product Amount'
                onChange={(event) => setAmount(event.target.value)}
                className="form-control form-control" />
            </div>
            <div className={'form-outline mb-2'}>
              <textarea 
                rows={5}
                cols={6}
                onChange={(event) => setDescription(event.target.value)}
                placeholder='Product Description'
                className="form-control form-control textBox " />
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={props.onHide}>Close</button>
            <button type="button" className="btn btn-primary" onClick={onSaveHandler}>Save</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductListModal;