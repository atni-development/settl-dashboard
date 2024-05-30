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
  function parseDate(input) {
    // Transform date from text to date
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}
  useEffect(() => {
    console.log("Step 2");
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      setComision(0.0);
      var userId = localStorage.getItem('userId').trim();

      var currentCard = localStorage.getItem(userId+'current_card');
      console.log(currentCard);
      if (currentCard !== null) {
        var sessionTime = localStorage.getItem(userId+'session_date');
        if(sessionTime === null){
          router.push("/deposit-money/step-1");

        }else{
          var date = new Date();
          var currentDate = parseInt(date.getTime());
          var sessionDate = parseInt(sessionTime);
          
          var diff = currentDate - sessionDate;
          var diffMinutes = Math.round(diff / 60000);
          console.log("Diff minutes: " + diffMinutes);
          if(diffMinutes > 1){
            
            localStorage.removeItem(userId+'session_date');
            localStorage.removeItem(userId+'current_card');
            localStorage.removeItem(userId+'amountToPay');
            localStorage.removeItem(userId+'commisionToPay');

            router.push("/deposit-money/step-1");
          }else{
            var card = JSON.parse(currentCard);

           console.log("current card is: " + card.cardNumber);
          }
        }
        
      } else {
        router.push("/deposit-money/step-1");
      }
    }
  }, []);

  const handleAmountChange = (e, data) => {
    if (e.target.value > 4720) {
      setError("La cantidad máxima es de $30,700.00");
    } else {
      setError(null);
      var commision = e.target.value * 0.05;
      var iva = commision * 0.16;
      var num = commision + iva;
      var totalComision = Math.round(num * 100) / 100
      var userId = localStorage.getItem('userId').trim();

      localStorage.setItem(userId+'amountToPay', e.target.value);
      localStorage.setItem(userId+'commisionToPay', totalComision);

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
                        className="single-link last"
                      >
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

                      <p>Escribe la cantidad a gestionar con Settl</p>

                      <div className="input-area">
                        <p><b>$</b></p>
                        <input
                          onChange={(e) => handleAmountChange(e, "amount")}
                          className="xxlr"
                          min="0"
                          maxLength={4}
                          placeholder=" Ejemplo 1000.00"
                          type="number"
                        />
                        <p>MXN</p>
                      </div>
                      <p>
                        Comisión:<b>${comision}</b>  ·   Monto mínimo disponible<b>$500.00</b>  ·   Máximo disponible<b>$4720.00</b>
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
