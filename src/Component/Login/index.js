
import React, {  } from 'react';
export const Modal = ({ handleClose, children }) => {
  
    return (
      <div>
        <section className="modal-main">
          {children}
         
        </section>
      </div>
    );
  };