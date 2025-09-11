import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";

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
      const currentCard = localStorage.getItem(userId+'current_card');

      if (currentCard) {
        const sessionTime = localStorage.getItem(userId+'session_date');
        if (!sessionTime) {
          router.push("/deposit-money/step-1");
        } else {
          const date = new Date();
          const currentDate = date.getTime();
          const sessionDate = parseInt(sessionTime);
          const diff = currentDate - sessionDate;
          const diffMinutes = Math.round(diff / 60000);

          if (diffMinutes > 1) {
            localStorage.removeItem(userId+'session_date');
            localStorage.removeItem(userId+'current_card');
            localStorage.removeItem(userId+'amountToPay');
            localStorage.removeItem(userId+'commissionToPay');

            router.push("/deposit-money/step-1");
          } else {
            const card = JSON.parse(currentCard);
            
            // Detect card type and set appropriate max amount
            if (card && card.cardNumber) {
              const detectedType = detectCardType(card.cardNumber);
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
        router.push("/deposit-money/step-1");
      }
    }
  }, [router]);

  const formatNumber = (num) => {
    if (!num) return '';
    const parts = num.toString().split('.');
    const intPart = parts[0];
    const decPart = parts[1] ? '.' + parts[1] : '';
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedInt + decPart;
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(rawValue);

    if (numValue >= (maxAmount+1)) {
      const formattedMax = formatNumber(maxAmount.toString());
      const cardTypeText = cardType === 'amex' ? 'American Express' : 'Visa/Mastercard';
      setError(`La cantidad máxima para tarjetas ${cardTypeText} es de $${formattedMax}.00`);
    } else {
 

        setError(null);
      const commission = numValue * 0.048;
      const iva = commission * 0.16;
      const totalCommission = Math.round((commission + iva) * 100) / 100;
      const userId = localStorage.getItem('userId')?.trim();
  
      

      localStorage.setItem(userId + 'amountToPay', rawValue);
      localStorage.setItem(userId + 'commisionToPay', totalCommission);

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
        router.push("/deposit-money/step-3");
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
              <h4>Comprar tiempo</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row justify-content-between pb-120">
              <div className="col-xl-3 col-lg-4 col-md-5">
                <div className="left-area">
                  <ul>
                    <li>
                      <Link href="" className="single-link active">
                      Selecciona a qué tarjeta quieres comprarle tiempo
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
                  <form action="#">
                    <div className="send-banance">
                      {error && <Alert color="danger">{error}</Alert>}

                      <p>Escribe la cantidad a aplazar con Settl</p>

                      <div className="input-area">
                        <p><b>$</b></p>
                        <input
                          onChange={handleAmountChange}
                          className="xxlr"
                          min="0"
                          maxLength={8}
                          onWheel={() => document.activeElement.blur()}

                          placeholder="Ejemplo 10,000.00"
                          type="text"
                          value={formatNumber(amount)}
                        />
                        <p>MXN</p>
                      </div>
                      <p>
                        Comisión: <b>${commission}</b>  ·   Mínimo a aplazar <b>$500.00</b>  ·   Máximo a aplazar <b>${formatNumber(maxAmount.toString())}.00</b>
                      </p>
                    </div>
                    <p><br></br><b>Importante:</b><br></br>Tu tarjeta deberá tener como <b>saldo disponible</b> la cantidad a aplazar con Settl + la comisión por el servicio.</p>
                  </form>
                </div>
                <div className="footer-area mt-40">
                  <Link href="/deposit-money/step-1">Regresar</Link>
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
