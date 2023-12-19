import Image from "next/image";
import Link from "next/link";
import Select from "../select/Select";
import support_icon from "/public/images/icon/support-icon.png";

const currency = [
  { id: 1, name: "USD" },
  { id: 2, name: "USD" },
  { id: 3, name: "USD" },
];

const currencyTo = [
  { id: 1, name: "BTC" },
  { id: 2, name: "BTC" },
  { id: 3, name: "BTC" },
];

const StepTwo = () => {
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
                        className="single-link three"
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
                  <div className="exchange-content">
                    <div className="send-banance">
                      <span className="mdr">Amount</span>
                      <div className="input-area">
                        <input
                          className="xxlr"
                          placeholder="400.00"
                          type="number"
                        />
                        {/* Select */}
                        <Select
                          data={currency}
                          btn="bg-transparent"
                          btnText="fw-semibold"
                        />
                      </div>
                      <p>
                        Available Balance<b>$30,700.00</b>
                      </p>
                    </div>
                    <div className="send-banance recipient">
                      <span className="mdr">Recipient gets</span>
                      <div className="input-area">
                        <input
                          className="xxlr"
                          placeholder="0.010"
                          type="number"
                        />
                        {/* Select */}
                        <Select
                          data={currencyTo}
                          btn="bg-transparent"
                          btnText="fw-semibold"
                        />
                      </div>
                      <p>
                        Today’s rate: <b>1 BTC = 39156.90 USD</b>
                      </p>
                    </div>
                    <div className="pay-details">
                      <ul>
                        <li>
                          <p>Estimated fee</p>
                          <p>+0.33GBP</p>
                        </li>
                      </ul>
                      <div className="tatal-pay">
                        <div className="single">
                          <h5>Total</h5>
                          <h5>USD 400.00</h5>
                        </div>
                      </div>
                    </div>
                    <div className="footer-area mt-40">
                      <Link href="/buy-crypto/step-1">Previous Step</Link>
                      <Link href="/buy-crypto/step-3" className="active">
                        Next
                      </Link>
                    </div>
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

export default StepTwo;
