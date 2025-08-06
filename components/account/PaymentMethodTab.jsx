import Image from "next/image";
import add_new from "/public/images/add-new.png";
import blockchain_card from "/public/images/blockchain-card-large.png";
import paylio_card from "/public/images/paylio-card.png";
import paypal_card from "/public/images/paypal-card.png";
import visa_card from "/public/images/visa-card.png";
import master_card from "/public/images/master-card-large.png";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore";
import add_card from "/public/images/add-new.png";

const PaymentMethodTab = () => {

  

  const [currentCard, setCurrentCard] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [noCards, setNoCards] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      var db = getFirestore();
      let userId = localStorage.getItem('userId').trim();
      var collectionPath = "Users/" + userId + "/cards";
      const q = collection(db, collectionPath);
      onSnapshot(q, (querySnapshot) => {
        var cards = [];
        querySnapshot.forEach((doc) => {
          cards.push(doc.data());
        });
        if (cards.length > 0) {
          setAllCards(cards);
          //setCurrentCard(cards[0]);
        } else {
          setNoCards(true);
        }

        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            cards.find((card) => card.cardNumber === change.doc.data().cardNumber) ? null : cards.push(change.doc.data());
            setAllCards(cards);
            setNoCards(false);
          }
          if (change.type === "modified") {
            cards[cards.indexOf(doc.data())] = change.doc.data();
            setAllCards(cards);
            setNoCards(false);
          }
          if (change.type === "removed") {
            cards.splice(cards.indexOf(doc.data()), 1);
            setAllCards(cards);
            if (cards.length == 0) {
              setNoCards(true);
            }
          }
        });
      });

    }

  }, []);


  return (
    <div
      className="tab-pane pb-120 fade"
      id="payment"
      role="tabpanel"
      aria-labelledby="payment-tab"
    >
      <div className="card-area">
        <h6>Mis tarjetas de crédito</h6>
        
        <div className="card-content d-flex flex-wrap">
        { allCards.length > 0 ? allCards.map((item, index) => (
          <div className="col-3" key={index}>
           <div className="single-card">
            <div
              type="button"
              className="reg w-100"
              //data-bs-toggle="modal"
              //data-bs-target="#myCardModal"
            >
                          <Image src={item.bin.brand == "VISA" ?visa_card:master_card} alt="image" />
            </div>
          </div>
            <label htmlFor={item.cardNumber} key={index}>
            
                <p>Tarjeta Terminación {item.cardNumber.substring(item.cardNumber.length, item.cardNumber.length - 4)}</p>
            </label>

          </div>

        )): <div className="col-12">No hay tarjetas agregadas</div>}
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
    </div>
  );
};

export default PaymentMethodTab;
