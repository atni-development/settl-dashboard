import { SettlContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaCaretRight } from "react-icons/fa";
import bell from "/public/images/icon/bell.png";
import master_card from "/public/images/master-card.png";
import user_1 from "/public/images/user-1.png";
import user_2 from "/public/images/user-2.png";
import user_3 from "/public/images/user-3.png";

const NotificationsArea = () => {
  const { notificationActiveHandler, notificationActive } =
    useContext(SettlContext);

  return (
    <div className="single-item notifications-area">
      {/* <div className="notifications-btn">
        <Image
          src={bell}
          className="bell-icon"
          alt="icon"
          onClick={notificationActiveHandler}
        />
      </div> */}
      <div
        className={`main-area notifications-content ${
          notificationActive && "active"
        }`}
      >
        <div className="head-area d-flex justify-content-between">
          <h5>Notificaciones</h5>
          <span className="mdr">4</span>
        </div>
        <ul>
          <li>
            <Link href="#" className="d-flex">
              <div className="img-area">
                <Image src={user_1} className="max-un" alt="image" />
              </div>
              <div className="text-area">
                <p className="mdr">
                  Tu pago por la cantidad de  <b>$30,000.00</b> ha sido <b>realizado</b>  a la tarjeta terminación 04556
                </p>
                <p className="mdr time-area">02:39 PM</p>
              </div>
            </Link>
            <FaCaretRight />
          </li>
       
          <li>
            <Link href="#" className="d-flex">
              <div className="img-area">
                <Image src={master_card} className="max-un" alt="image" />
              </div>
              <div className="text-area">
                <p className="mdr">
                  Tu tarjeta de crédito con terminación 0445 ha sido  <b>agregada</b>  con éxito
                </p>
                <p className="mdr time-area">09:39 AM</p>
              </div>
            </Link>
            <FaCaretRight />
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default NotificationsArea;
