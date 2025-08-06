import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import { useState, useEffect, useRef } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";
import cards_match from "/public/images/match_cards.png";

import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { Alert } from 'reactstrap';
import { useSearchParams } from 'next/navigation'

import { useRouter } from 'next/router';
import { Button } from "reactstrap";
import axios from 'axios';

const StepThree = () => {
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardType, setCardType] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const showModalRef = useRef()
  const showPendingModalRef = useRef()
  const termsCheck = useRef()
  const operationsCheck = useRef()

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signature, setSignature] = useState(false);
  const [payingCard, setPayingCard] = useState({});

  const [currentCard, setCurrentCard] = useState({});
  const [currentAmount, setCurrentAmout] = useState(0);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [currentComission, setCurrentCommision] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams()
  var parseQueryString = function () {
    var str = window.location.search;
    var objURL = {};

    str.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function ($0, $1, $2, $3) {
        objURL[$1] = $3;
      }
    );

    return objURL;
  };

  const detectCardType = (cardNumber) => {
    // Remove all non-numeric characters
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    // American Express starts with 34 or 37
    if (cleanNumber.match(/^3[47]/)) {
      return 'amex';
    }
    // Visa starts with 4
    else if (cleanNumber.match(/^4/)) {
      return 'visa';
    }
    // Mastercard starts with 51-55 or 22-27
    else if (cleanNumber.match(/^5[1-5]/) || cleanNumber.match(/^2[2-7]/)) {
      return 'mastercard';
    }
    
    return 'unknown';
  };

  const getCVVLength = (cardType) => {
    return cardType === 'amex' ? 4 : 3;
  };

  const handleCVVChange = (event) => {
    const value = event.target.value;
    const maxLength = getCVVLength(cardType);
    
    // Only allow numeric input and limit to max length
    if (value.length <= maxLength && /^\d*$/.test(value)) {
      setCVV(value);
    }
  };




  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      setCurrentEmail(localStorage.getItem('email'));
      var userId = localStorage.getItem('userId').trim();

      var params = parseQueryString();
      if (params['settlPaymentId']) {

        setTermsAccepted(true);
        setSignature(true);
        setLoading(true);
        termsCheck.current.checked = true;
        operationsCheck.current.checked = true;
        var docuLocation = "/Users/" + userId + "/payment_requests/" + params['settlPaymentId']
  
        const docRef = doc(getFirestore(), docuLocation);
        getDoc(docRef).then((doc) => {

          if (doc.exists) {
            var data = doc.data();
            setCurrentCard(data.cardToPay);
            setPayingCard(data.payingCard);
            setCurrentAmout(data.amount);
            setCurrentCommision(data.comission);
            
            // Detect card type from the paying card
            if (data.payingCard && data.payingCard.cardNumber) {
              const detectedType = detectCardType(data.payingCard.cardNumber);
              setCardType(detectedType);
            }
            setTimeout(
              function () {
                const functions = getFunctions();

                const checkPayment = httpsCallable(functions, 'getPaymentInfo');
                checkPayment({ paymentId: params['settlPaymentId'], })
                  .then((result) => {
          
                    if (result.data.payload.status === "completed") {
                      setLoading(false);
                      setSuccess(true);
                      setTermsAccepted(true);
                      setSignature(true);
                      showModalRef.current.click();

                    } else {
                      if (result.data.payload.status === "failed") {
                        setLoading(false);
                        setError("El cargo ha sido declinado, por favor verifique el estado de su tarjeta o comuníquese con el banco emisor. Error 699")
                      } else {
                        setLoading(false);
                        setSuccess(true);
                        showPendingModalRef.current.click();
                      }


                    }
                  })
                  .catch((error) => {
                    setLoading(false);
                    setError("Se produjo un error al registar al procesar la información de pago. Error 899")
                  });

              }, 100);
          }

        }).catch((error) => {
          setError("Se produjo un error al procesar la información de pago. Error 699")

        });
      } else {
        var currentCard = localStorage.getItem(userId + 'bc_current_card');
        var payingCard = localStorage.getItem(userId + 'bc_paying_card');

        var currentAmount = localStorage.getItem(userId + 'bc_amountToPay');
        var currentCommision = localStorage.getItem(userId + 'bc_commisionToPay');
        var sessionTime = localStorage.getItem(userId + 'bc_session_date');

        if (currentCard !== null || sessionTime !== null || payingCard !== null) {
          var card = JSON.parse(currentCard);
          var pCard = JSON.parse(payingCard);

          setCurrentCard(card);
          setPayingCard(pCard);
          
          // Detect card type from the paying card
          if (pCard && pCard.cardNumber) {
            const detectedType = detectCardType(pCard.cardNumber);
            setCardType(detectedType);
          }
          var date = new Date();
          var currentDate = parseInt(date.getTime());
          var sessionDate = parseInt(sessionTime);

          var diff = currentDate - sessionDate;
          var diffMinutes = Math.round(diff / 60000);
          if (diffMinutes > 20) {
            localStorage.removeItem(userId + 'bc_session_date');
            localStorage.removeItem(userId + 'bc_current_card');
            localStorage.removeItem(userId + 'bc_amountToPay');
            localStorage.removeItem(userId + 'bc_commisionToPay');
            router.push("/between-cards/step-1");
          } else {

            if (currentAmount !== null && currentCommision !== null) {
              setCurrentAmout(currentAmount);
              setCurrentCommision(currentCommision);
            } else {
              router.push("/between-cards/step-3");
            }
          }
        } else {
          router.push("/between-cards/step-1");
        }
      }
    }
  }, []);

  const onClose = event => {
    event.preventDefault();
    var userId = localStorage.getItem('userId').trim();
    localStorage.removeItem(userId + 'bc_session_date');
    localStorage.removeItem(userId + 'bc_current_card');
    localStorage.removeItem(userId + 'bc_amountToPay');
    localStorage.removeItem(userId + 'bc_commisionToPay');
    localStorage.removeItem(userId + 'bc_paying_card');

    router.push("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    if (termsAccepted && signature) {
      const expectedCVVLength = getCVVLength(cardType);
      if (cvv !== "" && cvv.length === expectedCVVLength) {

        try {
          var phone = localStorage.getItem('phone');
          if (phone !== null) {
            if (typeof OpenPay !== 'undefined') {
              OpenPay.setId('mdjfxaujamxkjpeernxz');
              OpenPay.setApiKey('pk_db2479b316df4f4db0c85a09c3b833c5');
              OpenPay.setSandboxMode(true);
              var deviceDataId = OpenPay.deviceData.setup("formId");
              var db = getFirestore();
              var currentUserData = {
                email: localStorage.getItem('email'),
                uid: localStorage.getItem('userId'),
                name: localStorage.getItem('name'),
                phone: phone
              };
              var paymentData = {
                paymentStatus: "Pending",
                chargeStatus: "Pending",
                method: "card_to_card",
                cardToPay: currentCard,
                payingCard: payingCard,
                amount: currentAmount,
                comission: currentComission,
                requested_date: new Date(),
                device_session_id: deviceDataId,
                userData: currentUserData
              };


              let userId = localStorage.getItem('userId').trim();
              var collectionPath = "Users/" + userId + "/payment_requests";
              const q = collection(db, collectionPath);
              addDoc(q, paymentData).then((docRef) => {
                const functions = getFunctions();
                const processsPayment = httpsCallable(functions, 'processNewCardToCardPayment');
                processsPayment({ paymentId: docRef.id, deviceId: deviceDataId, phoneNumber: phone, cardCVV: cvv })
                  .then((result) => {
                    if (result.data.status === "Success") {
                      if (result.data.payload.error_message !== null) {
                        setError(result.data.payload.error);
                        setLoading(false);
                      } else {
                        if (result.data.payload.payment_method) {
                          if (result.data.payload.payment_method.type !== "redirect") {
                            setLoading(false);
                            setSuccess(true);
                            showModalRef.current.click();
                          } else {
                            localStorage.setItem('bc_pending_return', true);
                            e.preventDefault();
                            router.push(result.data.payload.payment_method.url);
                          }

                        } else {
                          setLoading(false);
                          setSuccess(true);
                          showModalRef.current.click();
                        }
                      }
                    } else {
                      setLoading(false);
                      if (result.data.message) {
                        switch (result.data.message) {
                          case "The number of retries of charge is greater than allowed":
                            setError("El número de intentos de pago es mayor al permitido, por favor intenta de nuevo más tarde");
                            break;
                          case "The card was declined by the bank":
                            setError("La tarjeta fue declinada por el banco, por favor intenta con otra tarjeta o contacta a tu banco para más información");
                            break;
                          //default:  setError(result.data.message);
                          default: setError("Se produjo un error al procesar la información de pago.");
                            break;
                        }

                      } else {
                        setError("Se produjo un error al registar al procesar la información de pago. Error 587")
                      }
                    }
                  })
                  .catch((error) => {
                    setLoading(false);
                    setError("Se produjo un error al registar al procesar la información de pago. Error 585")
                  });

              })
                .catch((error) => {
                  setLoading(false);
                  setError("Se produjo un error al registar la información de pago Error 569")
                });

            } else {
              setLoading(false);
              setError("Se ha producido un error al cargar el servicio de pagos, por favor intenta de nuevo. Error 909");

            }
          } else {
            setLoading(false);
            setError("Debes indicar un número de teléfono para continuar");
          }
        } catch (e) {
          setLoading(false);
          setError("Se ha producido un error al cargar el servicio de pagos, por favor intenta de nuevo. Error 910");
        }
      } else {
        e.preventDefault();
        setLoading(false);
        const expectedLength = getCVVLength(cardType);
        const cardTypeText = cardType === 'amex' ? 'American Express' : 'Visa/Mastercard';
        const location = cardType === 'amex' ? 'frente' : 'reverso';
        setError(`Debes especificar el CVV de la tarjeta ${cardTypeText}, que son los ${expectedLength} dígitos al ${location} de la tarjeta`);
      }
    } else {
      e.preventDefault();
      setLoading(false);
      setError("Debes aceptar los términos y condiciones para continuar");
    }
  };


  return (
    <section className="dashboard-section body-collapse pay step step-3 crypto deposit-money">
      <Head>
        <script type="text/javascript" async="false" defer="false" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script type="text/javascript" async="false" defer="false" src="https://js.openpay.mx/openpay.v1.min.js"></script>
        <script type='text/javascript' async="false" defer="false" src="https://js.openpay.mx/openpay-data.v1.min.js"></script>

      </Head>
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Entre tarjetas</h4>

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
                        Selecciona la tarjeta que recibirá el pago
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="single-link active">
                        Selecciona la tarjeta con la que pagarás
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

                    <div className="head-area" style={{ display: "flex", alignItems: "center" }}                  >
                      <h4>Confirma la información</h4>
                      <div style={{ flexGrow: 0.05 }} />

                      <Image
                        src={cards_match}
                        alt="image"
                        width={100}
                        height={100}
                        style={{ marginLeft: "auto !important" }}
                      />
                      <div style={{ flexGrow: 1 }} />



                    </div>
                    <div className="row">
                      <div className="col-xxl-12 col-xl-10 col-lg-11 details-list">
                        <div className="row">
                          <div className="col-6">
                            <span>Banco</span>
                          </div>
                          <div className="col-6">
                            <b>{payingCard.bank}</b>
                          </div>
                        </div>
                        <br></br>
                      
                        <div className="row">
                          <div className="col-6">
                            <span>
                              No de la tarjeta que pagará⠀
                            </span>
                          </div>
                          <div className="col-6">
                            <b>
                              **** **** ****{" "}
                              {payingCard.cardNumber !== undefined
                                ? payingCard.cardNumber.substr(
                                  payingCard.cardNumber.length - 4,
                                  payingCard.cardNumber.length
                                )
                                : ""}
                            </b>
                          </div>
                        </div>
                        <br></br>
                        <div className="row">
                          <div className="col-6">
                            <span>
                              CVV de la tarjeta que pagará ⠀
                            </span>
                          </div>
                          <div className="col-6">
                            <input
                              className="cvvinput"
                              type="text"
                              id="cvv"
                              placeholder={cardType === 'amex' ? '****' : '***'}
                              maxLength={getCVVLength(cardType)}
                              value={cvv}
                              onWheel={() => document.activeElement.blur()}
                              onChange={handleCVVChange}
                            />
                          </div>
                        </div>
                        <br></br>
                        <div className="row">
                          <div className="col-6">
                            <span>Cantidad a aplazar</span>
                          </div>
                          <div className="col-6">
                            <b>${currentAmount !== 0 ? currentAmount : ""} MXN</b>
                          </div>
                        </div>
                        <br></br>
                        <div className="row">
                          <div className="col-6">
                            <span>
                              Comisión Settl<span className="small-text"> (incluye iva)⠀</span>
                            </span>
                          </div>
                          <div className="col-6">
                            <b>${currentComission !== 0 ? currentComission : ""} MXN</b>
                          </div>
                        </div>
                        <br></br>
                        <div className="row">
                          <div className="col-6">
                            <span>Se enviará comprobante a⠀</span>
                          </div>
                          <div className="col-6">
                            <b>{currentEmail}</b>
                          </div>
                        </div>
                        <br></br>
                        <div className="row">
                          <div className="col-6">
                            <span>
                              Informativo: No. de la tarjeta que recibirá el pago
                            </span>
                          </div>
                          <div className="col-6">
                            <b>
                              **** **** ****{" "}
                              {currentCard.cardNumber !== undefined
                                ? currentCard.cardNumber.substr(
                                  currentCard.cardNumber.length - 4,
                                  currentCard.cardNumber.length
                                )
                                : ""}
                            </b>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="checkbox-area mt-40 d-flex align-items-center justify-content-center">
                    <input ref={termsCheck} type="checkbox" id="accept" name="accept" onClick={
                      (e) => {
                        if (e.target.checked) {
                          setTermsAccepted(true);
                        } else {
                          setTermsAccepted(false);
                        }
                      }

                    } />
                    <label htmlFor="accept">
                      Al solicitar el pago acepto los <Link href="https://settl.mx/terms-and-conditions">términos y condiciones</Link> y <Link href="https://settl.mx/privacy-policy">políticas de privacidad</Link> del servicio
                    </label>

                  </div>
                  <div className="checkbox-area mt-20 d-flex align-items-center justify-content-center">
                    <input ref={operationsCheck} type="checkbox" id="accept" name="accept" onClick={
                      (e) => {
                        if (e.target.checked) {
                          setSignature(true);
                        } else {
                          setSignature(false);
                        }
                      }

                    } />
                    <label htmlFor="accept">
                      Al aceptar el cargo estoy firmando el <Link href="https://settl.mx/cards-contract">contrato de Settl</Link>  para la correcta operativa
                    </label>

                  </div>
                  <div className="footer-area mt-40">

                    {(!loading && !success) ? <Link href="/between-cards/step-3">Regresar</Link> : <p></p>}
                    <Link
                      style={{ display: "none" }}
                      onClick={(e) => {
                        e.preventDefault();

                      }}
                      href="#"
                      ref={showModalRef}
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#cardsCongratulationsMod"
                    >  </Link>
                    <Link
                      style={{ display: "none" }}
                      onClick={(e) => {
                        e.preventDefault();

                      }}
                      href="#"
                      ref={showPendingModalRef}
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#pendingMod"
                    >


                    </Link>
                    {success ? <button onClick={onClose} className="cmn-btn-success">Continuar</button> : !loading ? <button onClick={(e) => onSubmit(e)} className={signature && termsAccepted ? "cmn-btn" : "cmn-btn-dis"}>Pagar</button> : <button className="cmn-btn-gray" disabled>Procesando pago...   <div className="loader"></div></button>}


                  </div>
                  {loading ? <div className="mt-40 d-flex align-items-center justify-content-center"><p><b>No refresque la ventana ni cierre su explorador</b><br></br></p></div> : <p></p>}

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
