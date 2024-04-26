import Image from "next/image";
import Link from "next/link";
import add_new from "/public/images/add-new.png";
import blockchain_card from "/public/images/blockchain-card-large.png";
import option from "/public/images/icon/option.png";
import paylio_card from "/public/images/paylio-card-large.png";
import paypal_card from "/public/images/paypal-card-large.png";
import visa_card from "/public/images/visa-card-large.png";
import { Button } from "reactstrap";

const LinkedPaymentSystem = ({ data = {}, noCards = true }) => {
  return (
    <>
      <div className="section-text d-flex align-items-center justify-content-between">
        <h6>Tarjetas agregadas</h6>
        <div className="right-side">
          <div className="dropdown-area">
            <button
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Image src={option} alt="icon" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Button className="dropdown-item" onClick={() => console.log("Agregar tarjeta")}
                  data-bs-toggle="modal"
                  data-backdrop="static" data-keyboard="false"
                  data-bs-target="#addcardMod">
                  Agregar tarjeta
                </Button>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        { data.length > 0 ? data.map((item, index) => (
          <div className="col-6">
           
            <label htmlFor={item.cardNumber} key={index}>
              <div className="col-xl-12 col-lg-12 col-md-12" key={index}>
                <span className="wrapper"></span>
                <Image src={visa_card} alt="image" />
                <p>Mastercard Terminación {item.cardNumber.substring(item.cardNumber.length, item.cardNumber.length - 4)}</p></div>
            </label>

          </div>

        )): <div className="col-12">No hay tarjetas agregadas</div>}

      </div>
    </>
  );
};

export default LinkedPaymentSystem;
