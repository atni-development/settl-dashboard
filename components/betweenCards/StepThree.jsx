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
  const router = useRouter();

  useEffect(() => {
    console.log("Step 3");

    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = localStorage.getItem('userId')?.trim();
      const currentCard = localStorage.getItem(userId+'bc_current_card');
      const payingCard = localStorage.getItem(userId+'bc_paying_card');
      console.log("currentCard: " + currentCard);
      console.log("payingCard: " + payingCard);

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
            console.log("current card is: " + card.cardNumber);
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

    if (numValue >= 4721) {
      setError("La cantidad máxima es de $4720.00");
    } else {
 
      setError(null);
      const commission = numValue * 0.05;
      const iva = commission * 0.16;
      const totalCommission = Math.round((commission + iva) * 100) / 100;
      const userId = localStorage.getItem('userId')?.trim();
      console.log("userId: " + userId);
      console.log("rawValue: " + rawValue);
      console.log("totalCommission: " + totalCommission);
      

      localStorage.setItem(userId + 'bc_amountToPay', rawValue);
      localStorage.setItem(userId + 'bc_commisionToPay', totalCommission);

      setAmount(rawValue);
      setCommission(totalCommission);
     
    }
  };

  const handleContinue = () => {
    setError(null);
    if (parseFloat(amount) > 0) {
      if(parseFloat(amount) >= 500){
        router.push("/between-cards/step-4");
      }else{
        setError("El monto mínimo a pagar es de $500.00");
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
              <h4>Entre tarjetas (Paga una tarjeta de crédito con otra)</h4>
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
                      Selecciona la tarjeta que recibirá los fondos
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
                          placeholder="Ejemplo 1,000.00"
                          type="text"
                          value={formatNumber(amount)}
                        />
                        <p>MXN</p>
                      </div>
                      <p>
                        Comisión: <b>${commission}</b>  ·   Mínimo<b>$500.00</b>  ·   Máximo<b>$4,720.00</b>
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
