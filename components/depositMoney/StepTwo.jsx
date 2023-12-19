import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";

const StepTwo = () => {
  return (
    <section className="dashboard-section body-collapse pay step crypto deposit-money">
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
              <div className="col-xl-3 col-lg-4 col-md-5">
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
                        className="single-link last"
                      >
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-7">
                <div className="table-area">
                  <form action="#">
                    <div className="send-banance">
                      <span className="mdr">Escribe la cantidad que desees pagar a la tarjeta de crédito</span>
                      
                      <div className="input-area">
                      <p><b>$</b></p>
                        <input
                          className="xxlr"
                          placeholder=" Ejemplo 400.00"
                          type="number"
                        />
                        <p>MXN</p>
                      </div>
                      <p>
                        Comisión:<b>$350.00</b>  ·   Máximo disponible<b>$30,700.00</b>
                      </p>
                    </div>
                  </form>
                </div>
                <div className="footer-area mt-40">
                  <Link href="/deposit-money/step-1">Regresar</Link>
                  <Link href="/deposit-money/step-3" className="active">
                    Siguiente
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
