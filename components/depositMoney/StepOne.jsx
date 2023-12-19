import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import add_card from "/public/images/add-new.png";
import blockchain_card from "/public/images/blockchain-card.png";
import support_icon from "/public/images/icon/support-icon.png";
import paylio_card from "/public/images/paylio-card.png";
import paypal_card from "/public/images/paypal-card.png";
import visa_card from "/public/images/visa-card.png";

const StepOne = () => {
  const [checked, setChecked] = useState("visa");

  const handleChecked = (e) => {
    setChecked(e.target.name);
  };

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
                      <Link href="#" className="single-link active">
                        Selecciona el método de pago
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-2"
                        className="single-link two"
                      >
                        Introduce la cantidad a pagar
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="single-link last">
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-7">
                <div className="table-area">
                  <div className="head-area">
                    <h4>Tarjetas de crédito agregadas</h4>
                  </div>
                  <div className="card-area d-flex flex-wrap">
                    <div className="single-card">
                      <input
                        type="radio"
                        checked={checked === "visa" && true}
                        name="visa"
                        id="visa"
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="visa">
                        <span className="wrapper"></span>
                        <Image src={visa_card} alt="image" />
                      </label>
                    </div>
                    <div className="single-card">
                      <input
                        type="radio"
                        name="paypal"
                        id="paypal"
                        checked={checked === "paypal" && true}
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="paypal">
                        <span className="wrapper"></span>
                        <Image src={paypal_card} alt="image" />
                      </label>
                    </div>
                    <div className="single-card">
                      <input
                        type="radio"
                        name="paylio"
                        id="paylio"
                        checked={checked === "paylio" && true}
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="paylio">
                        <span className="wrapper"></span>
                        <Image src={paylio_card} alt="image" />
                      </label>
                    </div>
                    <div className="single-card">
                      <input
                        type="radio"
                        name="blockchain"
                        id="blockchain"
                        checked={checked === "blockchain" && true}
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="blockchain">
                        <span className="wrapper"></span>
                        <Image src={blockchain_card} alt="image" />
                      </label>
                    </div>
                    <div className="single-card">
                      <button
                        type="button"
                        className="reg w-100 p-0"
                        data-bs-toggle="modal"
                        data-bs-target="#addcardMod"
                      >
                        <Image src={add_card} alt="image" className="w-100" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="footer-area mt-40">
                  <Link href="#" className="d-none">
                    Regresar
                  </Link>
                  <Link href="/deposit-money/step-2" className="active">
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

export default StepOne;
