import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { getFirestore } from "firebase/firestore";
import { Alert } from 'reactstrap';
import Head from "next/head";
import play_icon from "/public/images/play_icon.png";

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
  const [allCards, setAllCards] = useState([]);
  const [noCards, setNoCards] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoUrl = "https://firebasestorage.googleapis.com/v0/b/settl-project.appspot.com/o/video2.mp4?alt=media&token=a702907a-c6bb-49b6-ac47-016e9426d98a"; // Replace with the actual video URL

  const handleChecked = (e, data) => {
    setError(null);

    setCurrentCard(data.cardNumber);
    var userId = localStorage.getItem('userId').trim();
    localStorage.setItem(userId+'current_card', JSON.stringify(data));
    localStorage.setItem(userId+'session_date', new Date().getTime());

  };

  const handleContinue = (e) => {
    setError(null);
    if(currentCard === "") {
      setError("Debes seleccionar una tarjeta para continuar");
    }else{
      router.push("/deposit-money/step-2");
    }
  };

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
          cards = cards.sort((a, b) => a.cardNumber.localeCompare(b.cardNumber));
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
    
        });
      })
    }
  }, []);
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
              
              {/*   <Image src={support_icon} alt="icon" /> */}
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
                      <Link
                        href=""
                        className="single-link two"
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
                   <button className="cmn-btn" onClick={() => setShowVideoModal(true)}>
            ¿Cómo funciona?
            <Image className="play-icon" src={play_icon} alt="Play Icon" />
          </button> 
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-7">
                <div className="table-area">
                  <div className="head-area">
                    <h4>Mis tarjetas de crédito</h4>
                    {noCards ? <p>Debes registrar una tarjeta para continuar.</p> : <p></p>}
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
                          <Image src={
                            item.bin.brand == "VISA" ? visa_card : 
                            item.bin.brand == "AMERICAN EXPRESS" ? american_express : 
                            master_card
                          } alt="image" />
                          <p>Tarjeta Terminación {item.cardNumber.substring(item.cardNumber.length, item.cardNumber.length - 4)}</p></div>
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
         {/* Video Modal */}
         {showVideoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowVideoModal(false)}>
              X
            </button>
            <iframe
              src={videoUrl}
              title="Video Tutorial"
              width="100%"
              height="400px"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 00px;
          border-radius: 20px;
          max-width: 700px;
          width: 110%;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 24px;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default StepOne;
