import Image from "next/image";
import CryptoCard from "../cards/CryptoCard";
import buy_crypto from "/public/images/icon/buy-crypto.png";
import sell_crypto from "/public/images/icon/sell-crypto.png";
import support_icon from "/public/images/icon/support-icon.png";

const cryptoData = [
  {
    id: 1,
    icon: buy_crypto,
    title: "Buy Crypto",
    link: "/buy-crypto/step-1",
  },
  {
    id: 2,
    icon: sell_crypto,
    title: "Sell Crypto",
    link: "/",
  },
];

const CryptoMain = () => {
  return (
    <section className="dashboard-section body-collapse pay crypto">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Crypto </h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row pb-120">
              {cryptoData.map((itm) => (
                <div key={itm.id} className="col-lg-3 col-md-5">
                  <CryptoCard data={itm} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoMain;
