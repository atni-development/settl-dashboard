import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";

const StepThree = () => {
  return (
    <section className="dashboard-section body-collapse pay step step-3 crypto deposit-money">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Pagar a tarjeta</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row justify-content-between pb-120">
              <div className="col-xl-3 col-lg-4">
                <div className="left-area">
                  <ul>
                    <li>
                      <Link
                        href="/deposit-money/step-1"
                        className="single-link active"
                      >
                        Selecciona el método de pago
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-2"
                        className="single-link active"
                      >
                        Introduce la cantidad a pagar
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-3"
                        className="single-link active last"
                      >
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8">
                <form action="#">
                  <div className="payment-details">
                    <div className="top-area">
                      <h6>Confirma la cantidad y la tarjeta a pagar</h6>
                      <div className="right">
                        <Link href="#">
                          <i className="icon-h-edit"></i>
                          Editar
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-8 col-xl-9 col-lg-12">
                        <ul className="details-list">
                          <li>
                            <span>Banco receptor</span>
                            <b>Santander S.A De C.V</b>
                          </li>
                          <li>
                            <span>Tarjeta de crédito</span>
                            <b>**** **** 6598 1182</b>
                          </li>
                          <li>
                            <span>Se pagará en la tarjeta</span>
                            <b>23,000.00 MXN</b>
                          </li>
                          <li>
                            <span>Comisión</span>
                            <b>$350.00 MXN</b>
                          </li>
                          <li>
                            <span>Se enviará la copia a</span>
                            <b>correo@ejemplo.com</b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-area mt-40 d-flex align-items-center justify-content-center">
                    <input type="checkbox" id="accept" name="accept" />
                    <label htmlFor="accept">
                      Al solicitar el pago acepto los <Link href="#">términos y condiciones y políticas de privacidad</Link> del servicio
                    </label>
                  </div>
                  <div className="footer-area mt-40">
                    <Link href="/deposit-money/step-2">Regresar</Link>
                    <Link
                      href="#"
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#congratulationsMod"
                    >
                      Pagar
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
