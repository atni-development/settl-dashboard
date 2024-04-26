import Image from "next/image";
import Link from "next/link";
import Select from "../select/Select";
import option from "/public/images/icon/option.png";

import { useState, useEffect } from 'react';


const AccountDetails = ({ data = {} }) => {
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let name = localStorage.getItem('name');
      let userId = localStorage.getItem('userId');
      let phone = localStorage.getItem('userphoneId');
      let email = localStorage.getItem('email');

      setPhone(phone);
      setUserId(userId);
      setEmail(email);
      setName(name);
    }
  }, []);
  return (
    <>
      <div className="top-area">
        <div className="left-side">
          <h4>Bienvenido {name.split(" ")[0]}</h4><br></br>
          {data.length > 0 ? <h5 className="receive">
            El pago realizado a la tarjeta terminación <h5 className="green-text">{data[0].card.cardNumber.substring(data[0].card.cardNumber.length -4)}</h5>  por ${data[0].amount} esta <h5 className="green-text">{data[0].paymentStatus.toLowerCase() === "completed" ? "completado": "pendiente"}</h5><span></span>
          </h5>:<h5 className="receive">No hay movimientos registrados</h5>}        
        </div>
        <div className="right-side">

        </div>
      </div>
      <div className="bottom-area">
        <div className="left-side">
          <Link href="/deposit-money/step-1" className="cmn-btn">
            Realizar un pago a una tarjeta
          </Link>
        </div>
      
      </div>
    </>
  );
};

export default AccountDetails;
