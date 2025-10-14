import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { getFirestore } from "firebase/firestore";
import { Alert } from 'reactstrap';
import Head from "next/head";
import cards_match from "/public/images/second_card.png";

import { doc, getDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/router';

import add_card from "/public/images/add-new.png";
import blockchain_card from "/public/images/blockchain-card.png";
import support_icon from "/public/images/icon/support-icon.png";
import paylio_card from "/public/images/paylio-card.png";
import paypal_card from "/public/images/paypal-card.png";
import visa_card from "/public/images/visa-card.png";
import master_card from "/public/images/master-card-card.png";
import american_express from "/public/images/american-express-card.png";

import { Button } from "reactstrap";

const StepOne = () => {
  const [checked, setChecked] = useState(null);
  const [currentCard, setCurrentCard] = useState("");

  const [preSelectedCards, setPreSelectedCards] = useState([]);

  const [allCards, setAllCards] = useState([]);
  const [noCards, setNoCards] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleChecked = (e, data) => {
    setError(null);

    setCurrentCard(data.cardNumber);
    console.log('Card selected:', data.cardNumber);
    var userId = localStorage.getItem('userId').trim();
    localStorage.setItem(userId + 'bc_paying_card', JSON.stringify(data));
  };

  const handleContinue = (e) => {
    setError(null);
    if (currentCard === "") {
      setError("Debes seleccionar una tarjeta para continuar");
    } else {
      router.push("/between-cards/step-3");
    }
  };

  // Combine and sort all cards (preselected + all cards)
  const getAllCombinedCards = () => {
    const combined = [...preSelectedCards, ...allCards];
    return combined.sort((a, b) => a.cardNumber.localeCompare(b.cardNumber));
  };

  // Check if a card is preselected
  const isPreselected = (cardNumber) => {
    return preSelectedCards.some(card => card.cardNumber === cardNumber);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = localStorage.getItem('userId')?.trim();
      const currentCard = localStorage.getItem(userId + 'bc_current_card');
      if (!currentCard) {
        router.push("/between-cards/step-1");
      } else {

        var currentCardInfo = JSON.parse(currentCard);
        setPreSelectedCards([currentCardInfo]);
        // Don't set the preselected card as current - this step is for selecting a different card

        //setCurrentCard(card);
        var db = getFirestore();
        var collectionPath = "Users/" + userId + "/cards";
        const q = collection(db, collectionPath);
        onSnapshot(q, (querySnapshot) => {
          var cards = [];
          querySnapshot.forEach((doc) => {
            if (currentCardInfo.cardNumber !== doc.data().cardNumber) {
              cards.push(doc.data());
            } 
          });
          if (cards.length > 0) {
            cards = cards.sort((a, b) => a.cardNumber.localeCompare(b.cardNumber));

            setAllCards(cards);

          } else {
            setError("Debes registrar una tarjeta para continuar");

            setNoCards(true);
          }
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              if (change.doc.data().cardNumber !== currentCardInfo.cardNumber) {
                cards.find((card) => card.cardNumber === change.doc.data().cardNumber) ? null : cards.push(change.doc.data());
                setAllCards(cards);
                setNoCards(false);
              }
            }
          });
        })
      }
    }
  }, []);

  const combinedCards = getAllCombinedCards();

  console.log('Current selected card:', currentCard);
  console.log('Combined cards:', combinedCards.map(c => c.cardNumber));

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
                      <Link
                        href=""
                        className="single-link three"
                      >
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
                  <div className="head-area" style={{ display: "flex", alignItems: "center" }}                  >
                    <h4>Mis tarjetas de crédito</h4>


                    <Image
                      src={cards_match}
                      alt="image"
                      width={100}
                      height={100}
                      style={{ marginLeft: "auto !important" }}
                    />
                  </div>
                  {error && <Alert color="danger">{error}</Alert>}
                  <div className="card-area d-flex flex-wrap">
                    {/* Combined cards display - sorted alphabetically */}
                    {combinedCards.map((item, index) => {
                      const isSelected = currentCard === item.cardNumber;
                      const isDisabled = isPreselected(item.cardNumber);
                      console.log(`Card ${item.cardNumber.slice(-4)}: selected=${isSelected}, disabled=${isDisabled}`);
                      
                      return (
                        <div 
                          className={`single-card ${isSelected ? 'selected' : ''}`} 
                          key={`combined-${item.cardNumber}-${index}`}
                        >
                          <input
                            type="radio"
                            checked={isSelected}
                            name="cardSelection"
                            id={item.cardNumber}
                            value={item.cardNumber}
                            onClick={(e) => {
                              // Don't allow selecting the preselected card
                              if (!isDisabled) {
                                handleChecked(e, item);
                              }
                            }}
                            disabled={isDisabled}
                          />
                          <label htmlFor={item.cardNumber} style={{position: 'relative'}}>
                            {isDisabled && (
                              <div 
                                className="card-overlay"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: 'rgba(36, 63, 91, 0.75)',
                                  borderRadius: '10px',
                                  zIndex: 999,
                                  pointerEvents: 'none',
                                  display: 'block'
                                }}
                              ></div>
                            )}
                            <div className="col-xl-12 col-lg-12 col-md-12">
                              <span className="wrapper"></span>
                              
                              <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                <Image 
                                  src={
                                    item.bin.brand == "VISA" ? visa_card : 
                                    item.bin.brand == "AMERICAN EXPRESS" ? american_express : 
                                    master_card
                                  } 
                                  alt="image"
                                  style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                  }}
                                />
                              </div>

                              <p className="text" style={{position: 'relative'}}>&nbsp;Tarjeta Terminación {item.cardNumber.substring(item.cardNumber.length, item.cardNumber.length - 4)}
                              </p>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                    
                    <div className="single-card">
                      <div
                        type="button"
                        className="reg w-100 p-0"
                        data-bs-toggle="modal"
                        data-backdrop="static" data-keyboard="false"
                        data-bs-target="#addcardMod"
                        style={{cursor: 'pointer'}}
                      >
                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <Image 
                            src={add_card} 
                            alt="image" 
                            style={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'contain'
                            }}
                          />
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <div className="footer-area mt-40">
                  <Link href="/between-cards/step-1">Regresar</Link>

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

export default StepOne;