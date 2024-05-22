import Image from "next/image";
import confirm from "/public/images/icon/confirm.png";
import not_confirm from "/public/images/icon/not-confirm.png";
import pending from "/public/images/icon/pending.png";
import owner_profile_2 from "/public/images/owner-profile-2.png";
import { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
const AccountTab = () => {
  
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
      localStorage.setItem('email',null);
      localStorage.setItem('phone',null);
      localStorage.setItem('name',null);
      localStorage.setItem('userId', null);
      localStorage.setItem('profilePicture', null);

      localStorage.setItem('created_date', null);
      router.push("/login");
      
    }).catch((error) => {
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
    <div
      className="tab-pane fade show active"
      id="account"
      role="tabpanel"
      aria-labelledby="account-tab"
    >
      <div className="upload-avatar">
        <div className="avatar-left d-flex align-items-center">
          <div className="profile-img">
          <Image src={profilePicture?profilePicture:owner_profile_2} alt="User" width="60" height="0"   style={{width: 60, height: 60, borderRadius: 60/ 2}}  />

          </div>
          <div className="instraction">
            <h6>Tu Avatar</h6>
            <p>Tamaño máximo: 400px x 400px</p>
          </div>
        </div>
        <div className="avatar-right">
          <div className="file-upload">
            <div className="right-area">
              <label className="file">
                <input type="file" />
                <span className="file-custom"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <form action="#">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="fName1">Nombre</label>
              <input type="text" id="fName1" placeholder={name} />
            </div>
          </div>
          
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="email1">Correo electrónico</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-12">
                  <input
                    type="text"
                    id="email1"
                    placeholder={email}
                  />
                </div>
              {/*   <div className="col-6">
                  <span className="pending">
                    <Image src={pending} alt="icon" />
                    Pendiente de confirmación
                  </span>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="phone1">Teléfono</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <input type="text" id="phone1" placeholder="(55) 12345678" />
                </div>
                <div className="col-6">
                  <span className="confirm">
                    <Image src={confirm} alt="icon" />
                    Número de teléfono confirmado
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input file">
              <label>Identificación</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <div className="file-upload">
                    <div className="right-area">
                      <label className="file">
                        <input type="file" />
                        <span className="file-custom"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <span className="notconfirm">
                    <Image src={not_confirm} alt="icon" />
                    Indentidad por confirmar
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="btn-border">
              <button className="cmn-btn">Guardar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountTab;
