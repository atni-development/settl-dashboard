import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import cards_match from "/public/images/money_card.png";

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const StepTwo = () => {
  const [amount, setAmount] = useState("");
  const [commission, setCommission] = useState(0.0);
  const [error, setError] = useState(null);
  const [cardType, setCardType] = useState("");
  const [maxAmount, setMaxAmount] = useState(6020); // Default for Visa/Mastercard
  const router = useRouter();

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

  useEffect(() => {

    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = localStorage.getItem('userId')?.trim();
      const currentCard = localStorage.getItem(userId+'bc_current_card');
      const payingCard = localStorage.getItem(userId+'bc_paying_card');
    

      if (currentCard && payingCard) {
        const sessionTime = localStorage.getItem(userId+'bc_session_date');
        if (!sessionTime) {
          router.push("/between-cards/step-1");
        } else {
          const date = new Date();
          const currentDate = date.getTime();
          const sessionDate = parseInt(sessionTime);
          const diff = currentDate - sessionDate;
          const diffMinutes = Math.round(diff / 60000);

          if (diffMinutes > 2) {
            localStorage.removeItem(userId+'bc_paying_card');
            localStorage.removeItem(userId+'bc_session_date');
            localStorage.removeItem(userId+'bc_current_card');
            localStorage.removeItem(userId+'bc_amountToPay');
            localStorage.removeItem(userId+'bc_commissionToPay');

            router.push("/between-cards/step-1");
          } else {
            const card = JSON.parse(currentCard);
            const payingCardData = JSON.parse(payingCard);
            
            // Detect card type from the paying card (the one with limits)
            if (payingCardData && payingCardData.cardNumber) {
              const detectedType = detectCardType(payingCardData.cardNumber);
              setCardType(detectedType);
              
              if (detectedType === 'amex') {
                setMaxAmount(10000);
              } else {
                setMaxAmount(6020); // For Visa and Mastercard
              }
            }
          }
        }
      } else {
        router.push("/between-cards/step-2");
      }
    }
  }, [router]);

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(rawValue);

    if (numValue >= maxAmount+1) {
      const formattedMax = formatNumber(maxAmount.toString());
      const cardTypeText = cardType === 'amex' ? 'American Express' : 'Visa/Mastercard';
      setError(`La cantidad máxima para tarjetas ${cardTypeText} es de $${formattedMax}.00`);
    } else {
 
  
        setError(null);
      const commission = numValue * 0.05;
      const iva = commission * 0.16;
      const totalCommission = Math.round((commission + iva) * 100) / 100;
      const userId = localStorage.getItem('userId')?.trim();


      localStorage.setItem(userId + 'bc_amountToPay', rawValue);
      localStorage.setItem(userId + 'bc_commisionToPay', totalCommission);

      setAmount(rawValue);
      setCommission(totalCommission);
     
    }
  };

  const handleContinue = () => {

     setError(null);
    const amountValue = parseFloat(amount);
    if (amountValue > 0) {
      // Validate minimum amount when button is pressed
      if (amountValue < 501) {
        setError("El monto mínimo a pagar es de $500.00");
      } else {
      router.push("/between-cards/step-4");
      }
    } else {
      setError("Debes indicar el monto para continuar");
    }
  };

  return (
    <section className="dashboard-section body-collapse pay step crypto deposit-money">
          <Head>
          <script type="text/javascript" async="false" defer="false" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
   <script type="text/javascript" async="false" defer="false" src="https://js.openpay.mx/openpay.v1.min.js"></script>
    <script type='text/javascript' async="false" defer="false" src="https://js.openpay.mx/openpay-data.v1.min.js"></script>
          </Head>
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
            <h4>Entre tarjetas <span>(Paga una tarjeta de crédito con otra)</span></h4>
            
            </div>
            <div className="row justify-content-between pb-120">
              <div className="col-xl-3 col-lg-4 col-md-5">
                <div className="left-area">
                  <ul>
                    <li>
                      <Link href="" className="single-link active">
                      Selecciona la tarjeta que recibirá el pago
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="single-link active">
                      Selecciona la tarjeta con la que pagarás
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="single-link active">
                        Introduce la cantidad
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="single-link last">
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-7">
                <div className="table-area">
                  <div className="head-area"   style={{ display: "flex", alignItems: "center" }}                  >
                    <h4>Introduce la cantidad</h4>
                    <div style={{ flexGrow: 0.05 }} /> {/* Flexible empty space */}

                    <Image
    src={cards_match}
    alt="image"
    width={100}
    height={100}
    style={{ marginLeft: "auto !important" }}
  />


                  </div>
                  <form action="#">
                    <div className="send-banance">
                      {error && <Alert color="danger">{error}</Alert>}

                      <p>Escribe la cantidad a pagar entre tarjetas</p>

                      <div className="input-area">
                        <p><b>$</b></p>
                        <input
                          onChange={handleAmountChange}
                          className="xxlr"
                          min="0"
                          maxLength={4}
                          onWheel={() => document.activeElement.blur()}

                          placeholder="Ejemplo 1,000.00"
                          type="text"
                          value={formatNumber(amount)}
                        />
                        <p>MXN</p>
                      </div>
                      <p>
                        Comisión: <b>${commission}</b>  ·   Mínimo<b>$500.00</b>  ·   Máximo<b>${formatNumber(maxAmount.toString())}.00</b>
                      </p>
                    </div>
                  </form>
                </div>
                <div className="footer-area mt-40">
                  <Link href="/between-cards/step-2">Regresar</Link>
                  <Button className="cmn-btn" onClick={handleContinue}>
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
