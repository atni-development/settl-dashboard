import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import { useState, useEffect, useRef } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Head from "next/head";
import { Alert } from 'reactstrap';

import { useRouter } from 'next/router';
import { Button } from "reactstrap";
import axios from 'axios';

const StepThree = () => {
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const showModalRef = useRef()

  const [currentCard, setCurrentCard] = useState({});
  const [currentAmount, setCurrentAmout] = useState(0);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [currentComission, setCurrentCommision] = useState(0);
  const router = useRouter();


  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      setCurrentEmail(localStorage.getItem('email'));
      var currentCard = localStorage.getItem('current_card');
      var currentAmount = localStorage.getItem('amountToPay');
      var currentCommision = localStorage.getItem('commisionToPay');

      console.log(currentCard);
      if (currentCard !== null) {
        var card = JSON.parse(currentCard);
        setCurrentCard(card);
        console.log("current card is: " + card.cardNumber);
        if (currentAmount !== null && currentCommision !== null) {
          var amount = currentAmount;
          setCurrentAmout(amount);
          setCurrentCommision(currentCommision);
          console.log("current amount is: " + amount);
        } else {
          router.push("/deposit-money/step-2");
        }
      } else {
        router.push("/deposit-money/step-1");
      }
    }
  }, []);

  const onClose = event => {
    event.preventDefault();
    console.log("ON CLOSE");
    localStorage.removeItem('current_card');
    localStorage.removeItem('amountToPay');
    localStorage.removeItem('commisionToPay');
    router.push("/");
  }

  const onSubmit = async (e) => {
    setError(null);
    setLoading(true);
    console.log("OpenPay is loaded")
    try{
    var phone = localStorage.getItem('phone');
    if (phone !== null) {
      if (typeof OpenPay !== 'undefined') {
        OpenPay.setId('mdjfxaujamxkjpeernxz');
        OpenPay.setApiKey('pk_db2479b316df4f4db0c85a09c3b833c5');
        OpenPay.setSandboxMode(true);
        var deviceDataId = OpenPay.deviceData.setup("formId");
        console.log("Device Data ID: " + deviceDataId);
        var db = getFirestore();
        var currentUserData = {
          email: localStorage.getItem('email'),
          uid:  localStorage.getItem('userId'),
          name: localStorage.getItem('name'),
          phone: phone
        };
    
        /*const response = await axios.get('https://ipinfo.io/?token=6d105865cbf95e', {
          'Access-Control-Allow-Origin': true,
        });*/
        
        
        //var userData = response.data;
        //console.log(userData);
        var paymentData = {
          paymentStatus: "PENDING",
          chargeStatus: "PENDING",
          method: "credit_card",
          card: currentCard,
          amount: currentAmount,
          comission: currentComission, 
          requested_date: new Date(),
          device_session_id: deviceDataId,
         // client_info:userData,
          userData: currentUserData
        };


        let userId = localStorage.getItem('userId').trim();
        var collectionPath = "Users/" + userId + "/payment_requests";
        const q = collection(db, collectionPath);
        addDoc(q, paymentData).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          const functions = getFunctions();
        const processsPayment = httpsCallable(functions, 'processNewPayment');
        processsPayment({ paymentId: docRef.id, deviceId: deviceDataId, phoneNumber: phone})
          .then((result) => {
            console.log("Server responded");
            console.log(result);
            if(result.data.status === "Success"){
              console.log("Payment processed successfully");
              setLoading(false);
              setSuccess(true);
              showModalRef.current.click();
            }else{
              console.log("Error");
              setLoading(false);
              if(result.data.message){
                console.log("Error with message");
                switch(result.data.message){
                  case "The number of retries of charge is greater than allowed":
                    setError("El número de intentos de pago es mayor al permitido, por favor intenta de nuevo más tarde");
                    break;
                  case "The card was declined by the bank":
                    setError("La tarjeta fue declinada por el banco, por favor intenta con otra tarjeta o contacta a tu banco para más información");
                    break;
                  //default:  setError(result.data.message);
                  default:  setError("Se produjo un error al procesar la información de pago.");
                  break;
                }
               
              }else{
                console.log("Error no message");
                setError("Se produjo un error al registar al procesar la información de pago. Error 587")
              }
            }
          })
          .catch((error) => {
            setLoading(false);
            setError("Se produjo un error al registar al procesar la información de pago. Error 585")
            console.error("Error writing document: ", error);
          });

        })
          .catch((error) => {
            setLoading(false);
            setError("Se produjo un error al registar la información de pago Error 569")
            console.error("Error writing document: ", error);
          });


       
      } else {
        console.log("OpenPay is not loaded");
        setLoading(false);
        setError("Se ha producido un error al cargar el servicio de pagos, por favor intenta de nuevo");

      }
    } else {
      console.log("Phone is null");
      setLoading(false);
      setError("Debes indicar un número de teléfono para continuar");
    }
  }catch(e){
    console.log(e);
    setLoading(false);
    setError("Se ha producido un error al cargar el servicio de pagos, por favor intenta de nuevo");
  }
  };


  return (
    <section className="dashboard-section body-collapse pay step step-3 crypto deposit-money">
      <Head>
        <script type="text/javascript" src="https://resources.openpay.mx/lib/openpay-js/1.2.38/openpay.v1.min.js"></script>
        <script type="text/javascript" src="https://resources.openpay.mx/lib/openpay-data-js/1.2.38/openpay-data.v1.min.js"></script>
      </Head>
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Pagar con tarjeta</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row justify-content-between pb-120">
              <div className="col-xl-3 col-lg-4">
                <div className="left-area">
                  <ul>
                    <li>
                      <Link
                        href="/deposit-money/step-1"
                        className="single-link active"
                      >
                        Selecciona el método de pago
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-2"
                        className="single-link active"
                      >
                        Introduce la cantidad a pagar
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-3"
                        className="single-link active last"
                      >
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8">
                <form action="#">
                  <div className="payment-details">
                  {error && <Alert color="danger">{error}</Alert>}

                    <div className="top-area">
                      <h6>Confirma la cantidad y la tarjeta a pagar</h6>
                      <div className="right">
                      {(!loading && !success)? <Link  href="/deposit-money/step-2">
                          <i className="icon-h-edit"></i>
                          Editar
                        </Link>:<Link  href="/">
                          <i className="icon-h-edit"></i>
                          Continuar
                        </Link>}
                      </div>
         
                    </div>
                    <div className="row">
                      <div className="col-xxl-8 col-xl-9 col-lg-12">
                        <ul className="details-list">
                          <li>
                            <span>Banco receptor</span>
                            <b>{currentCard.bank}</b>
                          </li>
                          <li>
                            <span>Tarjeta de crédito</span>
                            <b>{currentCard.cardNumber}</b>
                          </li>
                          <li>
                            <span>Se pagará en la tarjeta</span>
                            <b>${currentAmount} MXN</b>
                          </li>
                          <li>
                            <span>Comisión</span>
                            <b>${currentComission} MXN</b>
                          </li>
                          <li>
                            <span>Se enviará la copia a</span>
                            <b>{currentEmail}</b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-area mt-40 d-flex align-items-center justify-content-center">
                    <input type="checkbox" id="accept" name="accept" />
                    <label htmlFor="accept">
                      Al solicitar el pago acepto los <Link href="#">términos y condiciones y políticas de privacidad</Link> del servicio
                    </label>

                  </div>
                  <div className="footer-area mt-40">

                    {(!loading && !success)? <Link href="/deposit-money/step-2">Regresar</Link>:<p></p>}
                    <Link
                    style={{display: "none"}}
                      href="#"
                      ref={showModalRef}
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#congratulationsMod"
                    >
                    
                    </Link> 
                     {success ? <button onClick={onClose} className="cmn-btn-success">Continuar</button> : !loading ? <button onClick={(e) => onSubmit(e)}className="cmn-btn">Pagar</button> : <button className="cmn-btn-dis" disabled>Procesando pago...   <div className="loader"></div></button>}

                 
                  </div>
                  {loading? <div className="mt-40 d-flex align-items-center justify-content-center"><p><b>No refresque la ventana ni cierre su explorador</b><br></br></p></div>:<p></p>}

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
