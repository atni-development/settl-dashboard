import Image from "next/image";
import PaymentCard from "../cards/PaymentCard";
import bank_account_icon from "/public/images/icon/bank-account-icon.png";
import paylio_account_icon from "/public/images/icon/paylio-account-icon.png";
import support_icon from "/public/images/icon/support-icon.png";

const paymentData = [
  {
    id: 1,
    icon: paylio_account_icon,
    title: "To a Recipient’s Paylio Account",
    pay: "Pay for free",
    link: "/pay/step-1",
  },
  {
    id: 2,
    icon: bank_account_icon,
    title: "To a Recipient’s bank account",
    pay: "Pay via bank transfer",
    link: "/",
  },
];

const PayMain = () => {
  return (
    <section className="dashboard-section body-collapse pay">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Make a Payment</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row pb-120">
              {paymentData.map((itm) => (
                <div key={itm.id} className="col-xxl-3 col-xl-4 col-md-5">
                  {/* Payment Card */}
                  <PaymentCard data={itm} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayMain;
