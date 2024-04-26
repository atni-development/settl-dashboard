import { SettlContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { FaCog, FaSignOutAlt, FaSortDown } from "react-icons/fa";
import avatar_2 from "/public/images/avatar-2.png";
import avatar from "/public/images/avatar.png";
import { Button } from "reactstrap";

const UserArea = () => {
  const { userActiveHandler, userActive } = useContext(SettlContext);

  const onLogOut = event => {
    console.log("logout");
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.setItem('email',null);
      localStorage.setItem('phone',null);
      localStorage.setItem('name',null);
      localStorage.setItem('userId', null);
      localStorage.setItem('created_date', null);

      router.push("/login");
      
    }).catch((error) => {
      // An error happened.
    });
  };

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

  const router = useRouter();

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
              <h5>{name}</h5>
            </Link>
            <span className="wallet-id">{email}</span>
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
            <Link href="" onClick={onLogOut} className="d-flex align-items-center gap-2">
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
