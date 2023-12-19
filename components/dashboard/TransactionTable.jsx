import Image from "next/image";
import Link from "next/link";
import right_arrow from "/public/images/icon/right-arrow.png";

const TransactionTable = () => {
  return (
    <>
      <div className="section-text">
        <h5>Transacciones</h5>
        <p>Actualizado en tiempo real</p>
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
              Últimas
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="upcoming-tab"
              data-bs-toggle="tab"
              data-bs-target="#upcoming"
              type="button"
              role="tab"
              aria-controls="upcoming"
              aria-selected="false"
            >
              Pendientes
            </button>
          </li>
        </ul>
        <div className="view-all d-flex align-items-center">
          <Link href="#">Ver todas</Link>
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
                    <p>Tarjeta Santader ***4089</p>
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
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                  <p>Tarjeta HSBC ***3089</p>
                    <p className="mdr">Pago a tarjeta</p>
                  </th>
                  <td>
                    <p>04:30 PM</p>
                    <p className="mdr">01 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completada</p>
                  </td>
                  <td>
                  <p>$15,000.00</p>
                    <p className="mdr">Comisión: $350.00</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                  <p>Tarjeta Banorte ***2099</p>
                    <p className="mdr">Pago a tarjeta</p>
                  </th>
                  <td>
                    <p>01:15 PM</p>
                    <p className="mdr">25 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completada</p>
                  </td>
                  <td>
                  <p>$12,000.00</p>
                    <p className="mdr">Comisión: $500.00</p>
                  </td>
                </tr>
             
              </tbody>
            </table>
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
