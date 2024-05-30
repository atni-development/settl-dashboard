import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import { useState, useEffect, useRef } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import Head from "next/head";
import { Alert } from 'reactstrap';
import { useSearchParams } from 'next/navigation'

import { useRouter } from 'next/router';
import { Button } from "reactstrap";
import axios from 'axios';

const StepThree = () => {
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const showModalRef = useRef()
  const showPendingModalRef = useRef()

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signature, setSignature] = useState(false);

  const [currentCard, setCurrentCard] = useState({});
  const [currentAmount, setCurrentAmout] = useState(0);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [currentComission, setCurrentCommision] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams()
  var parseQueryString = function() {
    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    
    return objURL;
};

  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      setCurrentEmail(localStorage.getItem('email'));
      var userId = localStorage.getItem('userId').trim();

      var currentCard = localStorage.getItem(userId+'current_card');
      var currentAmount = localStorage.getItem(userId+'amountToPay');
      var currentCommision = localStorage.getItem(userId+'commisionToPay');
      var sessionTime = localStorage.getItem(userId+'session_date');

      console.log(currentCard);
      if (currentCard !== null || sessionTime !== null) {
        var card = JSON.parse(currentCard);
        setCurrentCard(card);
        console.log("current card is: " + card.cardNumber);
        var date = new Date();
        var currentDate = parseInt(date.getTime());
        var sessionDate = parseInt(sessionTime);
        
        var diff = currentDate - sessionDate;
        var diffMinutes = Math.round(diff / 60000);
        if(diffMinutes > 1){
          localStorage.removeItem(userId+'session_date');
          localStorage.removeItem(userId+'current_card');
          localStorage.removeItem(userId+'amountToPay');
          localStorage.removeItem(userId+'commisionToPay');
          router.push("/deposit-money/step-1");
        }else{

        if (currentAmount !== null && currentCommision !== null) {
          var amount = currentAmount;
          var search = window.location.search
          console.log("Search: " + search);
          setCurrentAmout(amount);
          setCurrentCommision(currentCommision);
          console.log("currents amount is: " + amount);
          console.log(params);
          var params = parseQueryString();

          if(params['settlPaymentId']){
            setTermsAccepted(true);
            setSignature(true);
            setLoading(true);
            setTimeout(
              function() {
            const functions = getFunctions();

            const checkPayment = httpsCallable(functions, 'getPaymentInfo');
            checkPayment({ paymentId: params['settlPaymentId'], })
              .then((result) => {
                console.log("Server responded");
                console.log(result);
                if(result.data.payload.status === "completed"){
                  //console.log("Payment processed successfully");
                  //setLoading(false);
                  //setSuccess(true);
                  //showModalRef.current.click();
                  
                  const createWebhook = httpsCallable(functions, 'createPaymentWebhook');
                  createWebhook({ paymentId: params['settlPaymentId'], userEmail: currentEmail})
                  .then((result) => {
                    console.log("webhook created ");
                    console.log(result);
                  console.log("Payment processed nut pending");
                  setLoading(false);
                  setSuccess(true);
                  showModalRef.current.click();
                  }).catch((error) => {
                    console.log("Error creating webhook");
                    setLoading(false);
                    setError("Se produjo un error al procesar la información de pago. Error 698")
                  });
                }else{
                  const createWebhook = httpsCallable(functions, 'createPaymentWebhook');
                  createWebhook({ paymentId: params['settlPaymentId'], userEmail: currentEmail})
                  .then((result) => {
                    console.log("webhook created ");
                    console.log(result);
                  console.log("Payment processed nut pending");
                  setLoading(false);
                  setSuccess(true);
                  showPendingModalRef.current.click();
                  }).catch((error) => {
                    console.log("Error creating webhook");
                    setLoading(false);
                    setError("Se produjo un error al procesar la información de pago. Error 698")
                  });
                }
              })
              .catch((error) => {
                setLoading(false);
                setError("Se produjo un error al registar al procesar la información de pago. Error 585")
                console.error("Error writing document: ", error);
              });
    
            
            }, 3000);
          }
       

        } else {
          router.push("/deposit-money/step-2");
        }
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
    e.preventDefault();

    setError(null);
    setLoading(true);
    console.log("OpenPay is loaded")
    if(termsAccepted && signature){
      try{
        var phone = localStorage.getItem('phone');
        if (phone !== null) {
          if (typeof OpenPay !== 'undefined') {
            //OpenPay.setId('mdjfxaujamxkjpeernxz');
            //OpenPay.setApiKey('pk_db2479b316df4f4db0c85a09c3b833c5');
            //OpenPay.setSandboxMode(true);
            OpenPay.setId('metmqgrlkjtzv38toph7');
            OpenPay.setApiKey('pk_0e254f67b6934dc190aee7e0f023ab7f');
            OpenPay.setSandboxMode(false);
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
              paymentStatus: "Pending",
              chargeStatus: "Pending",
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
                  if(result.data.payload.error_message !== null){
                    setError(result.data.payload.error);
                    setLoading(false);
                  }else{  
                    if(result.data.payload.payment_method){
                      if(result.data.payload.payment_method.type !== "redirect"){
                        console.log("Payment processed successfully");
                        setLoading(false);
                        setSuccess(true);
                        showModalRef.current.click();
                      }else{
                        localStorage.setItem('pending_return', true);
                        e.preventDefault();
                        router.push(result.data.payload.payment_method.url);
                      }
    
                    }else{
                      console.log("Payment processed successfully");
                      setLoading(false);
                      setSuccess(true);
                      showModalRef.current.click();
                    }
                  }
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
    }else{
      e.preventDefault();
      setLoading(false);
      setError("Debes aceptar los términos y condiciones para continuar");
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
              <h4>Comprar tiempo</h4>
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
                        href=""
                        className="single-link active"
                      >
                        Selecciona qué tarjeta quieres gestionar con Settl
                      </Link>
                    </li>
                    <li>
                      <Link
                        href=""
                        className="single-link active"
                      >
                        Introduce la cantidad
                      </Link>
                    </li>
                    <li>
                      <Link
                        href=""
                        className="single-link active last"
                      >
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-7">
                <form action="#">
                  <div className="payment-details">
                  {error && <Alert color="danger">{error}</Alert>}

                    <div className="top-area">
                      <h6>Confirma la información</h6>
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
                            <span>Banco</span>
                            <b>{currentCard.bank}</b>
                          </li>
                          <li>
                            <span>No de la tarjeta de crédito</span> 
                            <b>**** **** **** {currentCard.cardNumber !== undefined ? currentCard.cardNumber.substr(currentCard.cardNumber.length-4, currentCard.cardNumber.length):""}  </b>
                          </li>
                          <li>
                            <span>Cantidad a aplazar</span>
                            <b>${currentAmount} MXN</b>
                          </li>
                          <li>
                            <span>Comisión Settl<span className="small-text"> (incluye iva)</span></span>
                            <b>${currentComission} MXN</b>
                          </li>
                          <li>
                            <span>Se enviará comprobante a</span>
                            <b>{currentEmail}</b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-area mt-40 d-flex align-items-center justify-content-center">
                    <input type="checkbox" id="accept" name="accept" onClick={
                      (e) => {
                        if(e.target.checked){
                          setTermsAccepted(true);
                        }else{
                          setTermsAccepted(false);
                        }
                      }
                    
                    } />
                    <label htmlFor="accept">
                      Al solicitar el pago acepto los <Link href="https://settl.mx/terms-and-conditions">términos y condiciones</Link> y <Link href="https://settl.mx/privacy-policy">políticas de privacidad</Link> del servicio
                    </label>

                  </div>
                  <div className="checkbox-area mt-20 d-flex align-items-center justify-content-center">
                    <input type="checkbox" id="accept" name="accept" onClick={
                      (e) => {
                        if(e.target.checked){
                          setSignature(true);
                        }else{
                          setSignature(false);
                        }
                      }
                    
                    } />
                    <label htmlFor="accept">
                    Al aceptar el cargo estoy firmando el contrato de Settl para la correcta operativa
                    </label>

                  </div>
                  <div className="footer-area mt-40">

                    {(!loading && !success)? <Link href="/deposit-money/step-2">Regresar</Link>:<p></p>}
                    <Link
                    style={{display: "none"}}
                    onClick={(e)=> {
                      e.preventDefault();
                  
                     }}
                      href="#"
                      ref={showModalRef}
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#congratulationsMod"
                    >  </Link>
                         <Link
                    style={{display: "none"}}
                    onClick={(e)=> {
                      e.preventDefault();
                  
                     }}
                      href="#"
                      ref={showPendingModalRef}
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#pendingMod"
                    >
                    
                    
                    </Link> 
                     {success ? <button onClick={onClose} className="cmn-btn-success">Continuar</button> : !loading ? <button onClick={(e) => onSubmit(e)}className={ signature && termsAccepted ? "cmn-btn": "cmn-btn-dis"}>Pagar</button> : <button className="cmn-btn-gray" disabled>Procesando pago...   <div className="loader"></div></button>}

                 
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
