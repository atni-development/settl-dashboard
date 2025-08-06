import { SettlContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { FaCog, FaSignOutAlt, FaSortDown } from "react-icons/fa";
import avatar_2 from "/public/images/avatar-2.png";

import { Button } from "reactstrap";

const UserArea = () => {
  const { userActiveHandler, userActive } = useContext(SettlContext);
  const avatar  = "https://firebasestorage.googleapis.com/v0/b/settl-project.appspot.com/o/owner-profile.png?alt=media&token=49f92549-3821-4964-a3a4-bc88312836d2"
  const onLogOut = event => {
    console.log("logout");
    const auth = getAuth();
    signOut(auth).then(() => {
      
      var userId = localStorage.getItem('userId').trim();
    
      localStorage.setItem('email',null);
      localStorage.setItem('phone',null);
      localStorage.setItem('name',null);
      localStorage.setItem('userId', null);
      localStorage.setItem('created_date', null);
      localStorage.setItem('profilePicture', null);

      localStorage.removeItem(userId+'session_date');
      localStorage.removeItem(userId+'current_card');
      localStorage.removeItem(userId+'amountToPay');
      localStorage.removeItem(userId+'commisionToPay');
  
      router.push("/login");
      
    }).catch((error) => {
      // An error happened.
     // router.push("/login");
      //console.log(error);
    });
  };

  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let name = localStorage.getItem('name');
      let userId = localStorage.getItem('userId');
      let phone = localStorage.getItem('userphoneId');
      let email = localStorage.getItem('email');
      let profilePicture = localStorage.getItem('profilePicture');
      if(profilePicture !== null && profilePicture !== undefined && profilePicture !== ""){
        if(profilePicture.includes("http")){
          setProfilePicture(profilePicture);
        }else{
          setProfilePicture("https://firebasestorage.googleapis.com/v0/b/settl-project.appspot.com/o/owner-profile.png?alt=media&token=49f92549-3821-4964-a3a4-bc88312836d2");
        }
      }else{
        setProfilePicture("https://firebasestorage.googleapis.com/v0/b/settl-project.appspot.com/o/owner-profile.png?alt=media&token=49f92549-3821-4964-a3a4-bc88312836d2");
      }

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
          {(profilePicture !== null && profilePicture !== undefined && profilePicture !== "")? <Image src={profilePicture} alt="User" onClick={userActiveHandler}   width="60" height="0"   style={{width: 60, height: "auto", borderRadius: 60/ 2}}  />:
          <Image src={avatar} alt="User" onClick={userActiveHandler}   width="60" height="0"   style={{width: 60, height: "auto", borderRadius: 60/ 2}}  />}
        </span>
        <i className="ms-0">
          <FaSortDown />
        </i>
      </div>
      <div className={`main-area user-content ${userActive && "active"}`}>
        <div className="head-area d-flex align-items-center">
          <div className="profile-img">
            <Image src={profilePicture?profilePicture:avatar_2} alt="User"  width="50" height="0"   style={{width: 60, height: "auto", borderRadius: 50/ 2}} />
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
