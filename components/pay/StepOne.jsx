import Image from "next/image";
import Link from "next/link";
import search from "/public/images/icon/search.png";
import support_icon from "/public/images/icon/support-icon.png";
import profile_1 from "/public/images/profile-1.png";
import profile_2 from "/public/images/profile-2.png";
import profile_3 from "/public/images/profile-3.png";

const StepOne = () => {
  return (
    <section className="dashboard-section body-collapse pay step">
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
                <span className="mdr">Step 1 of 3</span>
                <h5>Choose Recipient</h5>
              </div>
              <div className="recipient-list">
                <button className="my-recipients active">
                  <span className="icon-area">
                    <i className="icon-f-user"></i>
                  </span>
                  <span>My Recipients</span>
                </button>
                <button data-bs-toggle="modal" data-bs-target="#recipients1Mod">
                  <span className="icon-area">
                    <i className="icon-e-plus"></i>
                  </span>
                  <span>New Recipients</span>
                </button>
                <button>
                  <span className="icon-area">
                    <i className="icon-f-user"></i>
                  </span>
                  <span>Send to myself</span>
                </button>
              </div>
              <p className="recipients-item">200 Recipients</p>
            </div>
            <form action="#" className="flex-fill">
              <div className="form-group d-flex align-items-center">
                <Image src={search} alt="icon" />
                <input type="text" placeholder="Enter email, name or company" />
              </div>
            </form>
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
                  <Link href="#">Choose</Link>
                </div>
              </div>
              <div className="single-user">
                <div className="left d-flex align-items-center">
                  <div className="img-area">
                    <Image src={profile_2} alt="image" />
                  </div>
                  <div className="text-area">
                    <p>Morris Lucas</p>
                    <span className="mdr">Morris22@gmail.com</span>
                  </div>
                </div>
                <div className="right">
                  <Link href="#">Choose</Link>
                </div>
              </div>
              <div className="single-user">
                <div className="left d-flex align-items-center">
                  <div className="img-area">
                    <Image src={profile_3} alt="image" />
                  </div>
                  <div className="text-area">
                    <p>Willard Lyons</p>
                    <span className="mdr">Willard99@gmail.com</span>
                  </div>
                </div>
                <div className="right">
                  <Link href="#">Choose</Link>
                </div>
              </div>
            </div>
            <div className="footer-area mt-40">
              <Link href="/pay/step-1">Previous Step</Link>
              <Link href="/pay/step-2" className="active">
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
