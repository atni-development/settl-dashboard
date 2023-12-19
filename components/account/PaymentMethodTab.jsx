import Image from "next/image";
import add_new from "/public/images/add-new.png";
import blockchain_card from "/public/images/blockchain-card-large.png";
import paylio_card from "/public/images/paylio-card.png";
import paypal_card from "/public/images/paypal-card.png";
import visa_card from "/public/images/visa-card.png";

const PaymentMethodTab = () => {
  return (
    <div
      className="tab-pane pb-120 fade"
      id="payment"
      role="tabpanel"
      aria-labelledby="payment-tab"
    >
      <div className="card-area">
        <h6>Tarjetas de crédito asociadas</h6>
        <div className="card-content d-flex flex-wrap">
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#myCardModal"
            >
              <Image src={visa_card} alt="image" className="w-100" />
            </button>
          </div>
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#myCardModal"
            >
              <Image src={paylio_card} alt="image" className="w-100" />
            </button>
          </div>
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#myCardModal"
            >
              <Image src={paypal_card} alt="image" className="w-100" />
            </button>
          </div>
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#myCardModal"
            >
              <Image src={blockchain_card} alt="image" className="w-100" />
            </button>
          </div>
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#addcardMod"
            >
              <Image src={add_new} alt="image" className="w-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodTab;
