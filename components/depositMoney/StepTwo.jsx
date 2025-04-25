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
  const router = useRouter();

  useEffect(() => {
    console.log("Step 2");

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
            console.log("current card is: " + card.cardNumber);
          }
        }
      } else {
        router.push("/deposit-money/step-1");
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
      

      localStorage.setItem(userId + 'amountToPay', rawValue);
      localStorage.setItem(userId + 'commisionToPay', totalCommission);

      setAmount(rawValue);
      setCommission(totalCommission);
     
    }
  };

  const handleContinue = () => {
    setError(null);
    if (parseFloat(amount) > 0) {
       if(parseFloat(amount) >= 500){
      router.push("/deposit-money/step-3");
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
                          maxLength={4}
                          onWheel={() => document.activeElement.blur()}

                          placeholder="Ejemplo 1,000.00"
                          type="text"
                          value={formatNumber(amount)}
                        />
                        <p>MXN</p>
                      </div>
                      <p>
                        Comisión: <b>${commission}</b>  ·   Mínimo a aplazar <b>$500.00</b>  ·   Máximo a aplazar <b>$4,720.00</b>
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
