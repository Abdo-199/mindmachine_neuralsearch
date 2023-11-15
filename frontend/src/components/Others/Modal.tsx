import React from "react";
import "../../styles/Others/Modal.css";

// Modales Fenster
const Modal = ({
  header,
  closeModal,
  content,
}: {
  header: string;
  closeModal: any;
  content: any;
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="container">
          <span className="close" onClick={() => closeModal()}>
            &times;
          </span>
          <div>
            <h1>{header}</h1>
            {/* <Header title={header} fontSize={"1.5rem"}></Header> */}
            <div>
              {content} {/* An diese Stelle kommt der Inhalt hin */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
