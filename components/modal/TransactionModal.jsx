import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import transaction_details_icon from "/public/images/icon/transaction-details-icon.png";

const TransactionModal = ({ data = {} }) => {
  return (
    <div className="transactions-popup">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div className="modal fade" id="transactionsMod" aria-hidden="true">
              {data.card != undefined ?
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
                            <h6>{data.card.bank}</h6>
                            <br></br>
                            <h6>Tarjeta terminación ****{data.card.cardNumber.substr(data.card.cardNumber.length - 4)}</h6>
                            <p>{data.requested_date.toDate().toLocaleTimeString("es-MX", {day: "numeric", year: "numeric", month:"short"})}</p>

                            <h3>${data.amount}<span>MXN</span></h3>
                         
                          </div>
                        </div>
                        <div className="col-sm-7">
                          <div className="right-area">
                            <h6>Detalles</h6>
                            <ul className="payment-details">
                              <li>
                                <span>Cantidad solicitada</span>
                                <span>${data.amount} mxn</span>
                              </li>
                              <li>
                                <span>Comisión</span>
                                <span>${data.comission} mxn</span>
                              </li>
                              <li>
                                <span>Total cobrado</span>
                                <span>${parseFloat(data.comission + data.amoun).toFixed(2)} mxn</span>
                              </li>
                            </ul>
                            <ul className="payment-info">
                            <li>
                                <p>Banco emisor de la tarjeta</p>
                                <span className="mdr">{data.card.bank}</span>
                              </li>
                              <li>
                                <p>Forma de pago</p>
                                <span className="mdr">Tarjeta terminación ****{data.card.cardNumber.substr(data.card.cardNumber.length - 4)}</span>
                              </li>
                              <li>
                                <p>Descripción del pago</p>
                                <span className="mdr">
                                  OPENPAY*SETTL*
                                </span>
                              </li>
                              <li>
                                <p>Estado del cobro a la tarjeta</p>
                                <span className="mdr">
                                  {data.chargeStatus == "ERROR" ? data.message : "Completado"}
                                </span>
                              </li>
                              <li>
                                <p>ID de la transacción:</p>
                                <span className="mdr">
                                  {data.firestoreID}
                                </span>
                              </li>
                              <li>
                                <p>Pagado a tarjeta</p>
                                <span className="mdr">
                                  {data.paymentStatus}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>: <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header justify-content-between">
                      <h5>Detalles de la tranacción</h5></div></div></div>}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
