import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import profile_1 from "/public/images/profile-1.png";

const StepThree = () => {
  return (
    <section className="dashboard-section body-collapse pay step step-2 step-3 receive-3">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Request a Payment</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="choose-recipient">
              <div className="step-area">
                <span className="mdr">Step 3 of 4</span>
                <h5>Attach Documents</h5>
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
                <div className="col-xl-5 col-lg-6 col-md-8">
                  <ul className="details-list">
                    <li>
                      <span>Amount</span>
                      <b>400.00 GBP</b>
                    </li>
                    <li>
                      <span>Description</span>
                      <b>Software Development</b>
                    </li>
                    <li>
                      <span>Requested as</span>
                      <b>María Pérez</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="attach-documents">
              <div className="top-area">
                <h6>Attach documents</h6>
                <p>
                  Attact up to 5 documents ( like your invoice or work contact)
                  to your payment request.
                </p>
                <div className="file-upload">
                  <div className="right-area">
                    <label className="file">
                      <input type="file" />
                      <span className="file-custom"></span>
                      <span className="file-custom2"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-area mt-40">
              <Link href="/receive/step-2">Preview</Link>
              <Link href="/payment-submitted" className="active">
                Request Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
