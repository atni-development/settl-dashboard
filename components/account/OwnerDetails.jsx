import Image from "next/image";
import Link from "next/link";
import delete_2 from "/public/images/icon/delete-2.png";
import logout from "/public/images/icon/logout.png";
import owner_profile from "/public/images/owner-profile.png";
import { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";

const OwnerDetails = () => {

  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [created_date, setCreated_date] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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
      console.log(error);
     // router.push("/login");

      // An error happened.
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let name = localStorage.getItem('name');
      let userId = localStorage.getItem('userId');
      let phone = localStorage.getItem('userphoneId');
      let email = localStorage.getItem('email');
      let created_date = localStorage.getItem('created_date');
      let profilePicture = localStorage.getItem('profilePicture');

      setPhone(phone);
      setUserId(userId);
      setEmail(email);
      setName(name);
      setProfilePicture(profilePicture);
      setCreated_date(created_date);
    }
  }, []);

  return (
    <div className="owner-details">
      <div className="profile-area">
        <div className="profile-img">
        <Image src={profilePicture?profilePicture:owner_profile} alt="User"  width="120" height="0"   style={{width: 120, height: "auto", borderRadius: 120/ 2}}  />
        
        </div>
        <div className="name-area">
          <h6>{name}</h6>

        </div>
      </div>
      <div className="owner-info">
        <ul>
          <li>
            <p>ID:</p>
            <span className="mdr">{userId.substring(0,12)}</span>
          </li>
          <li>
            <p>Registrado el:</p>
            <span className="mdr">{created_date}</span>
          </li>
          {/* <li>
            <p>Identidad:</p>
            <span className="mdr">Confirmada</span>
          </li> */}
        </ul>
      </div>
      <div className="owner-action">
        <Link href="" onClick={onLogOut}>
          <Image src={logout} alt="image" />
          Cerrar sesión
        </Link>
        {/* <Link href="#" className="delete">
          <Image src={delete_2} alt="image" />
          Borrar cuenta
        </Link> */}
      </div>
    </div>
  );
};

export default OwnerDetails;
