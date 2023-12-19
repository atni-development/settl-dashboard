import Image from "next/image";
import flag_bd from "/public/images/icon/flag-bd.png";
import flag_usa from "/public/images/icon/flag-usa.png";

const DepositCard = () => {
  return (
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
  );
};

export default DepositCard;
