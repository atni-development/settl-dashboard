import Image from "next/image";
import Link from "next/link";
import flag_bd from "/public/images/icon/flag-bd.png";
import flag_usa from "/public/images/icon/flag-usa.png";
import support_icon from "/public/images/icon/support-icon.png";
import profile_1 from "/public/images/profile-1.png";

const StepThree = () => {
  return (
    <section className="dashboard-section body-collapse pay step step-2 step-3 exchange">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Money Exchange</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="choose-recipient">
                  <div className="step-area">
                    <span className="mdr">Step 3 of 3</span>
                    <h5>Choose Recipient</h5>
                  </div>
                  <div className="user-select">
                    <div className="single-user">
                      <div className="left d-flex align-items-center">
                        <div className="img-area">
                          <Image src={profile_1} alt="image" />
                        </div>
                        <div className="text-area">
                          <p>Herman Tran</p>
                          <span className="mdr">Herman35@gmail.com</span>
                        </div>
                      </div>
                      <div className="right">
                        <Link href="#" className="active">
                          <i className="icon-g-tick"></i>
                          Choose
                        </Link>
                        <Link href="#">
                          <i className="icon-h-edit"></i>
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <form action="#">
                  <div className="payment-details">
                    <div className="top-area">
                      <h6>Payment Details</h6>
                      <div className="right">
                        <Link href="#">
                          <i className="icon-h-edit"></i>
                          Edit
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-8 col-lg-12">
                        <ul className="details-list">
                          <li>
                            <span>Bank Name</span>
                            <b>Dutch bangla bank</b>
                          </li>
                          <li>
                            <span>Branch Name</span>
                            <b>Uttara Branch</b>
                          </li>
                          <li>
                            <span>Account number</span>
                            <b>*** *** *** ***</b>
                          </li>
                          <li>
                            <span>Reason for Sending</span>
                            <b>Purchase of Services</b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="footer-area mt-40">
                    <Link href="/exchange/step-2">Preview</Link>
                    <Link href="#" className="active">
                      Request Payment
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="side-area">
                  <p>Recipient gets</p>
                  <div className="title-area">
                    <h5>Bank Deposit</h5>
                    <ul className="flag-area">
                      <li>
                        <span className="icon-area">
                          <Image src={flag_usa} alt="icon" />
                        </span>
                      </li>
                      <li>
                        <span className="icon-area">
                          <Image src={flag_bd} alt="icon" />
                        </span>
                      </li>
                    </ul>
                  </div>
                  <ul className="deposit-details">
                    <li>
                      <span>You Send</span>
                      <b>400.00 GBP</b>
                    </li>
                    <li>
                      <span>They get</span>
                      <b>45433.03 BDT</b>
                    </li>
                    <li>
                      <span>Exchange rate</span>
                      <b>1 GBP = 113.58257 BDT</b>
                    </li>
                    <li>
                      <span>Our fee</span>
                      <b>+0.99 GBP</b>
                    </li>
                  </ul>
                  <ul className="deposit-details">
                    <li>
                      <span>Total to pay</span>
                      <b>400.99 GBP</b>
                    </li>
                    <li>
                      <span>They receive</span>
                      <b>45433.03 BDT</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
