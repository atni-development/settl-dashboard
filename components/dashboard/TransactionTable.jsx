import Image from "next/image";
import Link from "next/link";
import right_arrow from "/public/images/icon/right-arrow.png";
import { useState, useEffect, useRef } from 'react';
import TransactionModal from "../modal/TransactionModal";

const TransactionTable = ({ data = {} }) => {
  const [selectedTransacction, setSelectedTransaction] = useState({});

  return (
    <>
      <div className="section-text">
        <h5>Operaciones</h5>
      </div>
      <div className="top-area d-flex align-items-center justify-content-between">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="latest-tab"
              data-bs-toggle="tab"
              data-bs-target="#latest"
              type="button"
              role="tab"
              aria-controls="latest"
              aria-selected="true"
            >
              Operaciones más recientes
            </button>
          </li>

        </ul>
        <div className="view-all d-flex align-items-center">
          <Link href="/transactions">Ver todas</Link>
          <Image src={right_arrow} alt="icon" />
        </div>
      </div>
      <div className="tab-content mt-40">
        <div
          className="tab-pane fade show active"
          id="latest"
          role="tabpanel"
          aria-labelledby="latest-tab"
        >
          <div className="table-responsive">
            {data.length > 0 ? <div className="table-responsive"> <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tarjeta</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Edo. de retención</th>
                  <th scope="col">Edo. del pago</th>
                  <th scope="col">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {data.map(payment =>
                  <tr
                    onClick={() => setSelectedTransaction(payment)}
                    key={payment.requested_date.toString()}
                    data-bs-toggle="modal"
                    data-bs-target="#transactionsMod"
                  >
                    <th scope="row">
                      <p>Tarjeta ****{payment.card.cardNumber.substr(payment.card.cardNumber.length - 4)}</p>
                      <p className="mdr">Pago a tarjeta</p>
                    </th>
                    <td>
                      <p>{payment.requested_date.toDate().toLocaleTimeString()}</p>
                      <p className="mdr">{payment.requested_date.toDate().toLocaleDateString("es-MX", { day: "numeric", year: "numeric", month: "short" })}</p>
                    </td>
                    <td>
                      <p className={payment.chargeClassColor}>{payment.message == "Success" ? "Completado" : payment.message}</p>
                    </td>
                    <td>
                      <p className={payment.classColor}>{payment.paymentStatus}</p>
                    </td>
                    <td>
                      <p>${payment.amount}</p>
                      <p className="mdr">Comisión: ${payment.comission}</p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table> </div>
              : <div className="row">
                <div className="col-lg-3 col-md-4"></div>

                <div className="col-lg-6 col-md-6">
                  <h5>No se tienen operaciones registradas </h5><br></br>
                </div>
              </div>}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="upcoming"
          role="tabpanel"
          aria-labelledby="upcoming-tab"
        >
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Tarjeta Banorte ***2099</p>
                    <p className="mdr">Pago a tarjeta</p>
                  </th>
                  <td>
                    <p>03:00 PM</p>
                    <p className="mdr">10 Mar 2022</p>
                  </td>
                  <td>
                    <p className="inprogress">En progreso</p>
                  </td>
                  <td>
                    <p>$30,000.00</p>
                    <p className="mdr">Comisión: $700.00</p>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>

      </div>

    </>
  );
};

export default TransactionTable;
