import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { getFirestore } from "firebase/firestore";
import { Alert } from 'reactstrap';

import { doc, getDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/router';

import add_card from "/public/images/add-new.png";
import blockchain_card from "/public/images/blockchain-card.png";
import support_icon from "/public/images/icon/support-icon.png";
import paylio_card from "/public/images/paylio-card.png";
import paypal_card from "/public/images/paypal-card.png";
import visa_card from "/public/images/visa-card.png";
import master_card from "/public/images/master-card-card.png";

import { Button } from "reactstrap";

const StepOne = () => {
  const [checked, setChecked] = useState(null);
  const [currentCard, setCurrentCard] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [noCards, setNoCards] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleChecked = (e, data) => {
    setError(null);
    console.log(e);
    console.log(data);
    setCurrentCard(data.cardNumber);
    localStorage.setItem('current_card', JSON.stringify(data));
  };

  const handleContinue = (e) => {
    setError(null);
    console.log(currentCard);
    if(currentCard === "") {
      setError("Debes seleccionar una tarjeta para continuar");
    }else{
      router.push("/deposit-money/step-2");
    }
    console.log("Continue");
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      var db = getFirestore();
      let userId = localStorage.getItem('userId').trim();
      var collectionPath = "Users/" + userId + "/cards";
      const q = collection(db, collectionPath);
      onSnapshot(q, (querySnapshot) => {
        console.log("Current cards: ");
        var cards = [];
        querySnapshot.forEach((doc) => {
          cards.push(doc.data());
        });
        if (cards.length > 0) {
          console.log("Setting all cards")
          setAllCards(cards);
          //setCurrentCard(cards[0]);
        } else {
          console.log("No cards registered");
          setNoCards(true);
        }
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            cards.find((card) => card.cardNumber === change.doc.data().cardNumber) ? null : cards.push(change.doc.data());
            setAllCards(cards);
            setNoCards(false);
          }
          /*if (change.type === "modified") {
            change.newIndex
            cards[cards.indexOf(change.doc.data())] = change.doc.data();
            setAllCards(cards);
            setNoCards(false);
          }
          if (change.type === "removed") {
            cards.splice(cards.indexOf(change.doc.data()), 1);
            setAllCards(cards);
            if (cards.length == 0) {
              setNoCards(true);
            }
          }*/
        });

        /* if (cards.length > 0) {
           console.log("Setting all cards")
           setAllCards(cards);
           setCurrentCard(cards[0]);
         } else {
           console.log("No cards registered");
           setNoCards(true);
         }*/
      })
    }
  }, []);

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
                      <Link href="#" className="single-link active">
                        Selecciona qué tarjeta quieres gestionar con Settl
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-2"
                        className="single-link two"
                      >
                        Introduce la cantidad
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="single-link last">
                        Confirmar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-7">
                <div className="table-area">
                  <div className="head-area">
                    <h4>Tarjetas de crédito asociadas</h4>
                    {noCards ? <p>Debes registrar una tarjeta para continuar.</p> : <p>Selecciona una tarjeta para pagar</p>}
                  </div>
                  {error && <Alert color="danger">{error}</Alert>}
                  <div className="card-area d-flex flex-wrap">
                    {/* <div className="single-card">
                      <input
                        type="radio"
                        checked={checked === "visa" && true}
                        name="visa"
                        id="visa"
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="visa">
                        <span className="wrapper"></span>
                        <Image src={visa_card} alt="image" />
                      </label>
                      
                    </div>
                    */}
                    {allCards.map((item, index) => (
                      <div className="single-card"     key={index}>
                        <input
                          type="radio"
                          key={index}
                          checked={currentCard === item.cardNumber}
                          name="test"
                          id={item.cardNumber}
                          value={item.cardNumber}
                          onClick={(e) => handleChecked(e, item)}
                        />
                        <label htmlFor={item.cardNumber}     key={index}>
                        <div className="col-xl-12 col-lg-12 col-md-12"     key={index}>
                          <span className="wrapper"></span>
                          <Image src={item.bin.brand == "VISA" ?visa_card:master_card} alt="image" />
                          <p>Mastercard Terminación {item.cardNumber.substring(item.cardNumber.length, item.cardNumber.length - 4)}</p></div>
                        </label>

                      </div>
                    ))}
                    {/*  <div className="single-card">
                      <input
                        type="radio"
                        name="paypal"
                        id="paypal"
                        checked={checked === "paypal" && true}
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="paypal">
                        <span className="wrapper"></span>
                        <Image src={paypal_card} alt="image" />
                      </label>
                    </div>
                    <div className="single-card">
                      <input
                        type="radio"
                        name="paylio"
                        id="paylio"
                        checked={checked === "paylio" && true}
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="paylio">
                        <span className="wrapper"></span>
                        <Image src={paylio_card} alt="image" />
                      </label>
                    </div>
                    <div className="single-card">
                      <input
                        type="radio"
                        name="blockchain"
                        id="blockchain"
                        checked={checked === "blockchain" && true}
                        onChange={(e) => handleChecked(e)}
                      />
                      <label htmlFor="blockchain">
                        <span className="wrapper"></span>
                        <Image src={blockchain_card} alt="image" />
                      </label>
                    </div> */}
                    <div className="single-card">
                      <div
                        type="button"
                        className="reg w-100 p-0"
                        data-bs-toggle="modal"
                        data-backdrop="static" data-keyboard="false"
                        data-bs-target="#addcardMod"
                      >
                            <div className="col-xl-12 col-lg-12 col-md-12">          
                              <Image src={add_card} alt="image" className="w-100" />
                            </div>
              
                      </div>
                    </div>
                  </div>

                </div>
             
                <div className="footer-area mt-40">
                  <Link href="#" className="d-none">
                    Regresar
                  </Link>
                  <Button  className="cmn-btn" onClick={(e) => handleContinue(e)}>
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

export default StepOne;
