import Image from "next/image";
import Link from "next/link";
import profile_1 from "/public/images/profile-1.png";
import profile_2 from "/public/images/profile-2.png";
import profile_3 from "/public/images/profile-3.png";

const RecentTab = () => {
  return (
    <div
      className="tab-pane fade"
      id="recent"
      role="tabpanel"
      aria-labelledby="recent-tab"
    >
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
      <div className="col-12">
        <div className="footer-area mt-40">
          <Link href="/exchange/step-1">Previous Step</Link>
          <Link href="/exchange/step-3" className="active">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentTab;
