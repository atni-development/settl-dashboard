import { FaTimes } from "react-icons/fa";

const AddCardModal = () => {
  return (
    <div className="add-card">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div className="modal fade" id="addcardMod" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header justify-content-between">
                    <h6>Agregar tarjeta de crédito</h6>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i>
                        <FaTimes />
                      </i>
                    </button>
                  </div>
                  <form action="#">
                    
                    <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="single-input">
                          <label htmlFor="cardHolder">Banco receptor</label>
                          <input
                            type="text"
                            id="cardHolder"
                            placeholder="Santander"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-input">
                          <label htmlFor="cardNumber">Número de tarjeta</label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="5890 - 6858 - 6332 - 9843"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-input">
                          <label htmlFor="cardHolder">Nombre en la tarjeta</label>
                          <input
                            type="text"
                            id="cardHolder"
                            placeholder="María Pérez"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="month">Mes</label>
                          <input type="text" id="month" placeholder="12" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="year">Año</label>
                          <input type="text" id="year" placeholder="2025" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="year">CVV</label>
                          <input type="text" id="cvv" placeholder="***" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="year">Día de corte</label>
                          <input type="number" id="cvv" placeholder="Día del mes" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="btn-border w-100">
                          <button className="cmn-btn w-100">Agregar tarjeta</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
