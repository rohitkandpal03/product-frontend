
import React from "react";
import './AddProductList.css';

const StatusModal = (props) => {

  return (
    <div className="modal d-inline fade show backdrop" id="ModalCenter" >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

        <div className="modal-body">
            <h2 className="d-flex justify-content-center">{props.productStatus}</h2>
        </div>
        <div className="modal-footer d-flex justify-content-center">
            <button type="button" className="btn btn-secondary" onClick={props.onHide}>OK</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;