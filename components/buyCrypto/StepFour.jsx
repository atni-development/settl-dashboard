import Image from "next/image";
import Link from "next/link";
import spend_get from "/public/images/icon/spend-get.png";
import support_icon from "/public/images/icon/support-icon.png";

const StepFour = () => {
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
                        className="single-link active last"
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
                    <div className="single-spend-get method">
                      <div className="img-area">
                        <Image src={spend_get} alt="icon" />
                      </div>
                      <div className="text-area">
                        <p>Method</p>
                        <span>Settl card</span>
                      </div>
                    </div>
                  </div>
                  <p className="mdr">
                    You are about to buy 0.010 BTC from paylio
                  </p>
                  <div className="fee-area">
                    <ul>
                      <li>
                        <span>0.010</span>
                        <span>BTC</span>
                      </li>
                    </ul>
                    <ul className="fee">
                      <li>
                        <span>Service fee</span>
                        <span>0.000 BTC</span>
                      </li>
                      <li>
                        <span>You will pay</span>
                        <span>$400.00 USD</span>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-area mt-40">
                    <Link href="/buy-crypto/step-3">Previous Step</Link>
                    <Link
                      href="#"
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#purchasedMod"
                    >
                      Continue
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

export default StepFour;
