import Image from "next/image";
import Link from "next/link";
import Select from "../select/Select";
import support_icon from "/public/images/icon/support-icon.png";
import profile_1 from "/public/images/profile-1.png";

const currency = [
  { id: 1, name: "USD" },
  { id: 2, name: "USD" },
  { id: 3, name: "USD" },
];

const StepTwo = () => {
  return (
    <section className="dashboard-section body-collapse pay step step-2">
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
                <span className="mdr">Step 2 of 3</span>
                <h5>Set Amount of transfer</h5>
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
            <form action="#">
              <div className="send-banance">
                <span className="mdr">You Send</span>
                <div className="input-area">
                  <input className="xxlr" placeholder="400.00" type="number" />
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
              <ul className="total-fees">
                <li>Total Fees</li>
                <li>Free</li>
              </ul>
              <ul className="total-fees pay">
                <li>
                  <h5>Total To Pay</h5>
                </li>
                <li>
                  <h5>400.00 USD</h5>
                </li>
              </ul>
              <div className="footer-area mt-40">
                <Link href="/pay/step-1">Previous Step</Link>
                <Link href="/pay/step-3" className="active">
                  Next
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
