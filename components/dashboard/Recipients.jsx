import Image from "next/image";
import Link from "next/link";
import right_arrow from "/public/images/icon/right-arrow.png";
import recipients_1 from "/public/images/recipients-1.png";
import recipients_2 from "/public/images/recipients-2.png";
import recipients_3 from "/public/images/recipients-3.png";
import recipients_4 from "/public/images/recipients-4.png";
import { useState, useEffect } from 'react';

const Recipients = () => {
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
    <div className="single-item">
      <div className="section-text d-flex align-items-center justify-content-between">
        <h6>Tarjetahabiente</h6>
       {/* <div className="view-all d-flex align-items-center">
          <Link href="#">View All</Link>
          <Image src={right_arrow} alt="icon" />
        </div> */}
      </div>
      <ul className="recipients-item">
        <li>
          <p className="left d-flex align-items-center">
            <Image src={recipients_1} alt="icon" />
            <span className="info">
              <span>{name}</span>
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Recipients;
