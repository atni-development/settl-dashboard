import { SettlContext } from "@/context/context";
import leftSideMenuData from "@/data/leftSideMenuData";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import invite_now_illus from "/public/images/invite-now-illus.png";
import logo from "/public/images/logo.png";
import { getAuth, signOut } from "firebase/auth";

const LeftSideMenu = () => {
  const { activeLefMenu, setActiveLefMenu, getPath } =
    useContext(SettlContext);

  const onLogOut = event => {
    console.log("logout");
    const auth = getAuth();
    signOut(auth).then(() => {

      var userId = localStorage.getItem('userId').trim();

      localStorage.setItem('email', null);
      localStorage.setItem('phone', null);
      localStorage.setItem('name', null);
      localStorage.setItem('userId', null);
      localStorage.setItem('created_date', null);
      localStorage.setItem('profilePicture', null);

      localStorage.removeItem(userId + 'session_date');
      localStorage.removeItem(userId + 'current_card');
      localStorage.removeItem(userId + 'amountToPay');
      localStorage.removeItem(userId + 'commisionToPay');

      router.push("/login");

    }).catch((error) => {
    // router.push("/login");

      console.log(error);
    });
  };

  return (
    <div className={`sidebar-wrapper ${!activeLefMenu && "active"}`}>
      <div
        className="close-btn"
        onClick={() => setActiveLefMenu(!activeLefMenu)}
      >
        <i>
          <FaTimes />
        </i>
      </div>
      <div className="sidebar-logo">
        <Link href="https://settl.mx">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <ul>
        {leftSideMenuData.map((itm) => (
          <li key={itm.id} className={getPath === itm.path ? "active" : ""}>
            <Link href={itm.url}>
              {/* <Image src={itm.icon} alt={itm.name} /> */}
              {itm.icon}
              <span>{itm.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="bottom-item">
        <li className={getPath === "account" ? "active" : ""}>
          <Link href="/account">
            <i className="icon-account"></i> <span>Cuenta</span>
          </Link>
        </li>
        <li>
          <Link href="https://settl.mx/help-center">
            <i className="icon-support"></i> <span>Soporte</span>
          </Link>
        </li>
        <li>
          <Link href="" onClick={onLogOut}>
            <i className="icon-quit"></i> <span>Cerrar sesión</span>
          </Link>
        </li>
      </ul>
      <p id="version">Versión 1.2.8</p>
      {/*  <div className="pt-120">
        <div className="invite-now">
          <div className="img-area">
            <Image src={invite_now_illus} alt="Image" />
          </div>
          <p>Invita a un amigo y obtén $100 cuando haga su primera transacción</p>
          <Link href="" onClick={onLogOut} className="cmn-btn">
            Invitar ahora
          </Link>
        </div>
      </div> */}


    </div>
  );
};

export default LeftSideMenu;
