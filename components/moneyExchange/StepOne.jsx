import Image from "next/image";
import Link from "next/link";
import Select from "../select/Select";
import support_icon from "/public/images/icon/support-icon.png";

const currencySend = [
  { id: 1, name: "USD" },
  { id: 2, name: "USD" },
  { id: 3, name: "USD" },
];

const currencyGet = [
  { id: 1, name: "BDT" },
  { id: 2, name: "BDT" },
  { id: 3, name: "BDT" },
];

const deliveryMethod = [
  { id: 1, name: "Bank Tranfer" },
  { id: 2, name: "Bank Tranfer" },
  { id: 3, name: "Bank Tranfer" },
];

const bankTransfer = [
  { id: 1, name: "Dutch bangla bank" },
  { id: 2, name: "Dutch bangla bank" },
  { id: 3, name: "Dutch bangla bank" },
];

const StepOne = () => {
  return (
    <section className="dashboard-section body-collapse pay step step-2">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Money Exchange</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <form action="#">
              <div className="exchange-content">
                <div className="send-banance">
                  <span className="mdr">You Send</span>
                  <div className="input-area">
                    <input
                      className="xxlr"
                      placeholder="400.00"
                      type="number"
                    />
                    {/* Select  */}
                    <Select
                      data={currencySend}
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
                      placeholder="45162.98"
                      type="number"
                    />
                    {/* Select  */}
                    <Select
                      data={currencyGet}
                      btn="bg-transparent"
                      btnText="fw-semibold"
                    />
                  </div>
                  <p>
                    Today’s rate: <b>1 GBP = 112.90745 BDT</b>
                  </p>
                </div>
              </div>
              <div className="pay-option">
                <div className="pay-option-single">
                  <h6>Delivery method</h6>
                  {/* Select */}
                  <Select
                    data={deliveryMethod}
                    btn="border bg-white py-2 rounded-1"
                  />
                </div>
                <div className="pay-option-single border-area">
                  <h6>Bank Transfer Partner</h6>
                  {/* Select */}
                  <Select
                    data={bankTransfer}
                    btn="border bg-white py-2 rounded-1"
                  />
                </div>
              </div>
              <div className="pay-details">
                <ul>
                  <li>
                    <p>Estimated fee</p>
                    <p>+0.33GBP</p>
                  </li>
                  <li>
                    <p>Transfer time</p>
                    <p>Same Day</p>
                  </li>
                </ul>
                <div className="tatal-pay">
                  <div className="single">
                    <h5>Total To Pay</h5>
                    <h5>400.99GBP</h5>
                  </div>
                  <div className="single">
                    <p>Recipient gets</p>
                    <h5>45299.58BDT</h5>
                  </div>
                </div>
              </div>
              <div className="footer-area mt-40">
                <Link
                  href="/exchange/step-2"
                  className="w-100 active text-center"
                >
                  Continue
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
