import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import { useState, useEffect } from 'react';
import { getFirestore } from "firebase/firestore";
import { useRouter } from 'next/router';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const StepTwo = () => {
  const [amount, setAmount] = useState(0.0);
  const [comision, setComision] = useState(0.0);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Step 2");
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      setComision(0.0);
      var currentCard = localStorage.getItem('current_card');
      console.log(currentCard);
      if (currentCard !== null) {
        var card = JSON.parse(currentCard);
        console.log("current card is: " + card.cardNumber);
      } else {
        router.push("/deposit-money/step-1");
      }
    }
  }, []);

  const handleAmountChange = (e, data) => {
    if (e.target.value > 30700) {
      setError("La cantidad máxima es de $30,700.00");
    } else {
      setError(null);
      var commision = e.target.value * 0.05;
      var iva = commision * 0.16;
      var num = commision + iva;
      var totalComision = Math.round(num * 100) / 100
      
      localStorage.setItem('amountToPay', e.target.value);
      localStorage.setItem('commisionToPay', totalComision);

      setAmount(e.target.value);
      setComision(totalComision);
    }
  }

  const handleContinue = (e) => {
    setError(null);
    console.log(amount);
    if (amount > 0) {
      router.push("/deposit-money/step-3");
    } else {
      setError("Debes indicar el monto para continuar");
    }

  };

  return (
    <section className="dashboard-section body-collapse pay step crypto deposit-money">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Pagar a tarjeta</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row justify-content-between pb-120">
              <div className="col-xl-3 col-lg-4 col-md-5">
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
                        className="single-link last"
                      >
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-7">
                <div className="table-area">
                  <form action="#">
                    <div className="send-banance">
                      {error && <Alert color="danger">{error}</Alert>}

                      <span className="mdr">Escribe la cantidad que desees pagar a la tarjeta de crédito</span>

                      <div className="input-area">
                        <p><b>$</b></p>
                        <input
                          onChange={(e) => handleAmountChange(e, "amount")}
                          className="xxlr"
                          min="0"
                          maxLength={4}
                          placeholder=" Ejemplo 400.00"
                          type="number"
                        />
                        <p>MXN</p>
                      </div>
                      <p>
                        Comisión:<b>${comision}</b>  ·   Máximo disponible<b>$30,700.00</b>
                      </p>
                    </div>
                  </form>
                </div>
                <div className="footer-area mt-40">
                  <Link href="/deposit-money/step-1">Regresar</Link>
                  <Button className="cmn-btn" onClick={(e) => handleContinue(e)}>
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
