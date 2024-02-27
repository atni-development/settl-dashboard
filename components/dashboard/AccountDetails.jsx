import Image from "next/image";
import Link from "next/link";
import Select from "../select/Select";
import option from "/public/images/icon/option.png";



const AccountDetails = () => {
  return (
    <>
      <div className="top-area">
        <div className="left-side">
          <h5>Hola Ivan, por pagar:</h5>
          <h2>$30,700.00</h2>
          <h5 className="receive">
            Por el último pago recibido <span>$30,000</span>
          </h5>
        </div>
        <div className="right-side">

          <div className="right-bottom">
            <h4>$60,700.00</h4>
            <h5>Total Pagado</h5>
          </div>
        </div>
      </div>
      <div className="bottom-area">
        <div className="left-side">
          <Link href="/deposit-money/step-1" className="cmn-btn">
            Lorem ipsum dolor sit amet
          </Link>
        </div>
      
      </div>
    </>
  );
};

export default AccountDetails;
