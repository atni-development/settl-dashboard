import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import credit_card from "/public/images/icon/credit-card.png";
import paylio_card from "/public/images/icon/paylio-card.png";
import paypal from "/public/images/icon/paypal.png";
import spend_get from "/public/images/icon/spend-get.png";
import support_icon from "/public/images/icon/support-icon.png";

const StepThree = () => {
  const [checked, setChecked] = useState("paylio");

  const handleChecked = (e) => {
    setChecked(e.target.name);
  };
  return (
    <section className="dashboard-section body-collapse pay step crypto">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Buy Crypto</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row pb-120">
              <div className="col-lg-3 col-md-4">
                <div className="left-area">
                  <ul>
                    <li>
                      <Link
                        href="/buy-crypto/step-1"
                        className="single-link active"
                      >
                        Select Crypto
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buy-crypto/step-2"
                        className="single-link active"
                      >
                        Enter Amount
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buy-crypto/step-3"
                        className="single-link active"
                      >
                        Payment Info
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buy-crypto/step-4"
                        className="single-link last"
                      >
                        Confirm Order
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <form action="#">
                  <div className="spend-get">
                    <div className="single-spend-get">
                      <div className="img-area">
                        <Image src={spend_get} alt="icon" />
                      </div>
                      <div className="text-area">
                        <p>Spend</p>
                        <span>$400.00</span>
                      </div>
                    </div>
                    <div className="single-spend-get get">
                      <div className="img-area">
                        <Image src={spend_get} alt="icon" />
                      </div>
                      <div className="text-area">
                        <p>Get</p>
                        <span>0.010 BTC</span>
                      </div>
                    </div>
                  </div>
                  <label
                    className={`checkbox-single d-flex align-items-center ${
                      checked === "settl" && "active"
                    }`}
                  >
                    <span className="left-area">
                      <span className="checkbox-area d-flex">
                        <input
                          type="checkbox"
                          checked={checked === "settl" && true}
                          name="settl"
                          onChange={(e) => handleChecked(e)}
                        />
                        <span className="checkmark"></span>
                      </span>
                      <span className="item-title d-flex align-items-center">
                        <span className="img-area">
                          <Image src={paylio_card} alt="icon" />
                        </span>
                        <span>settl Card</span>
                      </span>
                    </span>
                  </label>
                  <label
                    className={`checkbox-single d-flex align-items-center ${
                      checked === "paypal" && "active"
                    }`}
                  >
                    <span className="left-area">
                      <span className="checkbox-area d-flex">
                        <input
                          type="checkbox"
                          checked={checked === "paypal" && true}
                          name="paypal"
                          onChange={(e) => handleChecked(e)}
                        />
                        <span className="checkmark"></span>
                      </span>
                      <span className="item-title d-flex align-items-center">
                        <span className="img-area">
                          <Image src={paypal} alt="icon" />
                        </span>
                        <span>Paypal</span>
                      </span>
                    </span>
                  </label>
                  <label
                    className={`checkbox-single d-flex align-items-center ${
                      checked === "credit_card" && "active"
                    }`}
                  >
                    <span className="left-area">
                      <span className="checkbox-area d-flex">
                        <input
                          type="checkbox"
                          checked={checked === "credit_card" && true}
                          name="credit_card"
                          onChange={(e) => handleChecked(e)}
                        />
                        <span className="checkmark"></span>
                      </span>
                      <span className="item-title d-flex align-items-center">
                        <span className="img-area">
                          <Image src={credit_card} alt="icon" />
                        </span>
                        <span>Credit / Debit Card</span>
                      </span>
                    </span>
                  </label>
                  <div className="footer-area mt-40">
                    <Link href="/buy-crypto/step-2">Previous Step</Link>
                    <Link href="/buy-crypto/step-4" className="active">
                      Next
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
