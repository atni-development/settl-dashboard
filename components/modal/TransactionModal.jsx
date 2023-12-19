import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import transaction_details_icon from "/public/images/icon/transaction-details-icon.png";

const TransactionModal = () => {
  return (
    <div className="transactions-popup">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div className="modal fade" id="transactionsMod" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header justify-content-between">
                    <h5>Detalles de la tranacción</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      {/* <i className="fa-solid fa-xmark"></i> */}

                      <FaTimes className="fs-4" />
                    </button>
                  </div>
                  <div className="main-content">
                    <div className="row">
                      <div className="col-sm-5 text-center">
                        <div className="icon-area">
                          <Image src={transaction_details_icon} alt="icon" />
                        </div>
                        <div className="text-area">
                          <h6>Tarjeta American Express ***0445</h6>
                          <p>16 Enero 2024</p>
                          <h3>$30,000.00 <span>MXN</span></h3>
                          <p className="com">Completado</p>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div className="right-area">
                          <h6>Detalles</h6>
                          <ul className="payment-details">
                            <li>
                              <span>Cantidad solicitada</span>
                              <span>$30,000 mxn</span>
                            </li>
                            <li>
                              <span>Comisión</span>
                              <span>$1350.00 mxn</span>
                            </li>
                            <li>
                              <span>Total cobrado</span>
                              <span>$31,450.00 mxn</span>
                            </li>
                          </ul>
                          <ul className="payment-info">
                            <li>
                              <p>Forma de pago</p>
                              <span className="mdr">Tarjeta Santander terminación ***0976</span>
                            </li>
                            <li>
                              <p>Descripción del pago</p>
                              <span className="mdr">
                                Pago a tarjeta de crédito SETTL*
                              </span>
                            </li>
                            <li>
                              <p>ID de la transacción:</p>
                              <span className="mdr">
                                2344576540932897324234
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
