import { SettlContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaCog, FaSignOutAlt, FaSortDown } from "react-icons/fa";
import avatar_2 from "/public/images/avatar-2.png";
import avatar from "/public/images/avatar.png";

const UserArea = () => {
  const { userActiveHandler, userActive } = useContext(SettlContext);

  return (
    <div className="single-item user-area">
      <div className="profile-area d-flex align-items-center">
        <span className="user-profile">
          <Image src={avatar} alt="User" onClick={userActiveHandler} />
        </span>
        <i className="ms-0">
          <FaSortDown />
        </i>
      </div>
      <div className={`main-area user-content ${userActive && "active"}`}>
        <div className="head-area d-flex align-items-center">
          <div className="profile-img">
            <Image src={avatar_2} alt="User" />
          </div>
          <div className="profile-head">
            <Link href="#">
              <h5>María Pérez</h5>
            </Link>
            <p className="wallet-id">ID: 6264849965</p>
          </div>
        </div>
        <ul>
          <li className="border-area">
            <Link href="/account" className="d-flex align-items-center gap-2">
              <FaCog />
              Configuración
            </Link>
          </li>
          <li>
            <Link href="#" className="d-flex align-items-center gap-2">
              <FaSignOutAlt />
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserArea;
