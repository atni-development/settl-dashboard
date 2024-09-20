import Link from "next/link";
import { useState, useEffect } from "react";

const AccountDetails = ({ data = [], onPlayVideo }) => {
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let name = localStorage.getItem("name");
      let userId = localStorage.getItem("userId");
      let phone = localStorage.getItem("userphoneId");
      let email = localStorage.getItem("email");

      setPhone(phone || "");
      setUserId(userId || "");
      setEmail(email || "");
      setName(name || "");
    }
  }, []);

  return (
    <>
      <div className="top-area">
        <div className="left-side">
          <h4>Bienvenid@ {name.split(" ")[0]}</h4>
          <br />
          {data.length > 0 ? (
            <h5 className="receive">
              El pago realizado a la tarjeta terminación{" "}
              <span className="green-text">
                {data[0].card.cardNumber.substring(data[0].card.cardNumber.length - 4)}
              </span>{" "}
              por ${Number(data[0].amount).toLocaleString()} está{" "}
              <span className="green-text">{data[0].paymentStatus.toLowerCase()}</span>
            </h5>
          ) : (
            <h5 className="receive">No hay movimientos registrados</h5>
          )}
        </div>
        <div className="right-side"></div>
      </div>
      <div className="bottom-area">
        <div className="left-side">
          <Link href="/deposit-money/step-1" className="cmn-btn">
            Comprar tiempo
          </Link>
          {/* Video Trigger Button */}
          <button className="cmn-btn" onClick={onPlayVideo}>
            ¿Cómo funciona?
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
