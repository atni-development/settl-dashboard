import Image from "next/image";
import Link from "next/link";
import CryptoTable from "./CryptoTable";
import support_icon from "/public/images/icon/support-icon.png";

const StepOne = () => {
  return (
    <section className="dashboard-section body-collapse pay crypto">
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
                        className="single-link two"
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
                {/* Crypto Table */}
                <CryptoTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
