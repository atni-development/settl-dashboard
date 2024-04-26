import Image from "next/image";
import Link from "next/link";
import imac from "/public/images/icon/imac.png";
import ipad from "/public/images/icon/ipad.png";
import iphone from "/public/images/icon/iphone.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const SecurityTab = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sessions, setSessions] = useState([]);

  const sendResetPassword = event => {
    const email = localStorage.getItem('email');
    const auth = getAuth();
    if(!resetSent){
      sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        setSendError("Se ha producido un error al enviar el correo de confirmación. Inténtelo de nuevo más tarde.");
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }else{

    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      var db = getFirestore();
      let userId = localStorage.getItem('userId').trim();
      var collectionPath = "Users/" + userId + "/sessions";
      const q = collection(db, collectionPath);
      onSnapshot(q, (querySnapshot) => {
        console.log("Current cards: ");
        var cards = [];
        querySnapshot.forEach((doc) => {
          cards.push(doc.data());
        });
        setSessions(cards);
        
      });
    }

  }, []);


  return (
    <div
      className="tab-pane fade"
      id="security"
      role="tabpanel"
      aria-labelledby="security-tab"
    >
{/*       <div className="single-content authentication d-flex align-items-center justify-content-between">
        <div className="left">
          <h5>Autenticación de dos factores</h5>
          <p>
          La Autenticación de dos factores(2FA) es últil para proteger tu cuenta de accesos no autorizados.
          </p>
        </div>
        <div className="right">
          <button>Activar</button>
        </div>
      </div> */}
      <div className="change-pass mb-40">
        <div className="row">
          <div className="col-sm-6">
            <h5>Cambiar la contraseña</h5>
            <p>
              Puede cambiar la contraseña si siente que su cuenta ha sido comprometida, o en la página de iniciar sesión si la olvidó. Se le enviará un correo de confirmación en donde podrá restablecer su contraseña.
            </p>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-4">
            
             <Link href="" onClick={sendResetPassword} className="active">{resetSent?"¡Correo de confirmación enviado!":"Enviar correo de confirmación"}</Link>
         {sendError?<p>{sendError}</p>:null}
         
          </div>
  {/*         <div className="col-sm-6">
            <form action="#">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="current-password">Contraseña actual</label>
                    <input
                      type="text"
                      id="current-password"
                      placeholder="Mínimo 8 caracteres, con un número y una letra"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="new-password">Nueva contraseña</label>
                    <input
                      type="text"
                      id="new-password"
                      placeholder="*********"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="confirm-password">
                      Confirmar contraseña
                    </label>
                    <input
                      type="text"
                      id="confirm-password"
                      placeholder="*********"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="btn-border w-100">
                    <button className="cmn-btn w-100">Actualizar contraseña</button>
                  </div>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      </div>
      <div className="single-content additional-security">
        <h5>Seguridad adicional</h5>
    
       {/*  <div className="single-setting">
          <div className="left">
            <h6>MFA</h6>
            <p>Google Authenticator</p>
          </div>
          <div className="right">
            <button>Confirugar</button>
          </div>
        </div> */}
        <div className="single-setting">
          <div className="left">
            <h6>Certificado de seguirdad</h6>
            <p>Secure Sockets Layer</p>
          </div>
          <div className="right">
            <button>Activado</button>
          </div>
        </div>
      </div>
      <div className="single-content your-devices">
        <div className="head-item d-flex align-items-center justify-content-between">
          <h5>Tus dispositivos</h5>
          <Link href="#">Cerrar sesión en todos los dispositivos</Link>
        </div>
        {
          sessions.map((session, index) =>
            <div className="single-setting" key={index}>
            <div className="left">
              <div className="icon-area">
                <Image src={iphone} alt="icon" />
              </div>
              <div className="text-area">
                <h6>{session.OSName} ({(session.platform)})</h6>
                <p>{session.browserName}</p>
               <p>{session.appVersion}</p>

                <p>Inició sesión a las {session.created_date.toDate().toLocaleDateString("es-MX")} {session.created_date.toDate().toLocaleTimeString("es-MX")}</p>
              </div>
            </div>
          {/*   <div className="right">
              <button>Cerrar sesión</button>
            </div> */}
          </div>
          )
        }
   
      </div>
    </div>
  );
};

export default SecurityTab;
