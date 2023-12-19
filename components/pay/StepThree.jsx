import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import profile_1 from "/public/images/profile-1.png";

const StepThree = () => {
  return (
    <section className="dashboard-section body-collapse pay step step-2 step-3">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Make a Payment</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="choose-recipient">
              <div className="step-area">
                <span className="mdr">Step 3 of 3</span>
                <h5>Confirm Your Transfer</h5>
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
                    <Link href="#">
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
                <div className="col-xl-6">
                  <ul className="details-list">
                    <li>
                      <span>You Send</span>
                      <b>400.00 GBP</b>
                    </li>
                    <li>
                      <span>Recipient gets</span>
                      <b>400.00 GBP</b>
                    </li>
                    <li>
                      <span>E-mail of receiver</span>
                      <b>morris22@gmail.com</b>
                    </li>
                    <li>
                      <span>Fee</span>
                      <b>Free</b>
                    </li>
                    <li>
                      <span>Purpose</span>
                      <b>Software development</b>
                    </li>
                    <li>
                      <span>Transfer will be receive on </span>
                      <b>29 June at 10:0 PM </b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <form action="#">
              <div className="checkbox">
                <input type="checkbox" id="confirm" />{" "}
                <label for="confirm">I confirm the payment details above</label>
              </div>
              <div className="footer-area mt-40">
                <Link href="/pay/step-2">Previous Step</Link>
                <Link
                  href="#"
                  className="transferMod active"
                  data-bs-toggle="modal"
                  data-bs-target="#transferMod"
                >
                  Pay
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
