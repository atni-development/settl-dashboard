import { SettlContext } from "@/context/context";
import dynamic from "next/dynamic";
import { useContext } from "react";
import Select from "../select/Select";
import AccountDetails from "./AccountDetails";
import LinkedPaymentSystem from "./LinkedPaymentSystem";
import Recipients from "./Recipients";
import TransactionTable from "./TransactionTable";
import { getFirestore } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, collection, query, where, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import right_arrow from "/public/images/icon/right-arrow.png";
import Image from "next/image";
import TransactionModal from "../modal/TransactionModal";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

/*const options = {
  labels: ["Santander", "AmEx", "HSBC"],
  dataLabels: {
    enabled: false,
  },
};*/
//const series = [44, 55, 13];
const series = [100];
const options = {
  labels: ["No hay pagos"],
  dataLabels: {
    enabled: false,
  },
}
const month = [
  { id: 1, name: "Jan" },
  { id: 2, name: "Feb" },
  { id: 3, name: "Mar" },
];

const DashboardMain = () => {
  const { activeLefMenu } = useContext(SettlContext);
  const [checked, setChecked] = useState(null);
  const [currentCard, setCurrentCard] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [noCards, setNoCards] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [shortTransactions, setShortTransactions] = useState([]);

  const [selectedTransacction, setSelectedTransaction] = useState({});

  const [chartOptions, setChartOptions] = useState({
    labels: ["No hay pagos"],
    dataLabels: {
      enabled: false,
    },
  });
  const [chartSeries, setChartSeries] = useState([100]);


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

      var collectionPath = "Users/" + userId + "/payment_requests";
      const collectionArr = collection(db, collectionPath);
      onSnapshot(collectionArr, (querySnapshot) => {
        var series = [];
        var options = [];
        var map = new Map();
        setTransactions([]);
        setShortTransactions([]);
        console.log("Length:  ")

      console.log(querySnapshot.docs.length);
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          data.firestoreID = doc.id;
          if(transactions.length == 0){
            transactions.push(data);
          }else{
            var flag = false;
            transactions.forEach((transaction) => {
              if(transaction.firestoreID == data.firestoreID){
                flag = true;
              }
            });
            if(!flag){
              transactions.push(data);
            }
          }
      
        });
        console.log("Transaction---: ");
        console.log(transactions);
        transactions.sort((a, b) => {
          return b.requested_date.toDate() - a.requested_date.toDate();
        });
        var total = 0;
        transactions.forEach((transaction) => {
          if (transaction.paymentStatus.toLowerCase() == "pending") {
            transaction.paymentStatus = "Pendiente";
            transaction.classColor = "inprogress";
          }
          if (transaction.paymentStatus.toLowerCase() == "completed") {
            transaction.paymentStatus = "Completada";
            transaction.classColor = "completed";
          }
          if (transaction.paymentStatus.toLowerCase() == "cancelled") {
            transaction.paymentStatus = "Cancelada";
            transaction.classColor = "cancelled";
          }
          if (transaction.paymentStatus.toLowerCase() == "in_progress") {
            transaction.paymentStatus = "En progreso";
            transaction.classColor = "normal";
          }
          if (transaction.chargeStatus.toLowerCase() == "success") {
            transaction.chargeStatusText = "Completado";

            transaction.chargeClassColor = "completed";
          }
          if (transaction.chargeStatus.toLowerCase() == "error") {
            transaction.chargeStatusText = "Cargo declinado";
            transaction.chargeClassColor = "cancelled";
            transaction.paymentStatus = "Cancelado";
            transaction.classColor = "cancelled";
          }
          if (transaction.chargeStatus.toLowerCase() == "failed") {
            transaction.chargeStatusText = "Cargo declinado";
            transaction.chargeClassColor = "cancelled";
            transaction.paymentStatus = "Cancelado";
            transaction.classColor = "cancelled";
          }
          if (transaction.chargeStatus.toLowerCase() == "completed") {
            transaction.chargeStatusText = "Completado";

            transaction.chargeClassColor = "completed";
          }
          total += 1;
          var k = transaction.card.cardNumber.substring(transaction.card.cardNumber.length - 4);
          if (map.has(k)) {
            map.set(k, map.get(k) + 1);
          } else {
            map.set(k, 1);
          }
        });
        map.forEach((value, key) => {
          series.push(
            Math.round(value / total * 100)
          );
          options.push(key);
        });
        if (transactions.length > 0) {
          setTransactions(transactions);
          setShortTransactions(transactions.slice(0, 5));
          setChartSeries(series);
          setChartOptions({
            labels: [...options],
            dataLabels: {
              enabled: false,
            },
          });
          //setCurrentCard(cards[0]);
        } else {
          setTransactions([]);
          setShortTransactions([]);
          setChartSeries([100]);
          setChartOptions({
            labels: ["No hay pagos por ahora"],
            dataLabels: {
              enabled: false,
            },
          });
        }
      });

    }

  }, []);


  return (
    <section
      className={`dashboard-section ${activeLefMenu && "body-collapse"}`}
    >
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="section-content">
                <div className="acc-details">
                  {/* Account Details */}
                  <AccountDetails data={shortTransactions} />
                </div>
                <div className="transactions-area mt-40">
                  {/* Transaction Tabel  */}
                  <div className="section-text">
                    <h5>Operaciones</h5>
                  </div>
                  <div className="top-area d-flex align-items-center justify-content-between">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="latest-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#latest"
                          type="button"
                          role="tab"
                          aria-controls="latest"
                          aria-selected="true"
                        >
                          Recientes
                        </button>
                      </li>

                    </ul>
                    <div className="view-all d-flex align-items-center">
                      <Link href="/transactions">Ver todas</Link>
                      <Image src={right_arrow} alt="icon" />
                    </div>
                  </div>
                  <div className="tab-content mt-40">
                    <div
                      className="tab-pane fade show active"
                      id="latest"
                      role="tabpanel"
                      aria-labelledby="latest-tab"
                    >
                      <div className="table-responsive">
                        {shortTransactions.length > 0 ? <div className="table-responsive"> <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Tarjeta</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Estado del cargo</th>
                              <th scope="col">Estado del pago</th>
                              <th scope="col">Cantidad</th>
                            </tr>
                          </thead>
                          <tbody>
                            {shortTransactions.map(payment =>
                              <tr
                                onClick={() => setSelectedTransaction(payment)}
                                key={payment.requested_date.toString()}
                                data-bs-toggle="modal"
                                data-bs-target="#transactionsMod"
                              >
                                <th scope="row">
                                  <p>Tarjeta ****{payment.card.cardNumber.substr(payment.card.cardNumber.length - 4)}</p>
                                  <p className="mdr">Pago a tarjeta</p>
                                </th>
                                <td>
                                  <p>{payment.requested_date.toDate().toLocaleTimeString()}</p>
                                  <p className="mdr">{payment.requested_date.toDate().toLocaleDateString("es-MX", { day: "numeric", year: "numeric", month: "short" })}</p>
                                </td>
                                <td>
                                  <p className={payment.chargeClassColor}>{payment.chargeStatusText}</p>
                                </td>
                                <td>
                                  <p className={payment.classColor}>{payment.paymentStatus}</p>
                                </td>
                                <td>
                                  <p>${payment.amount}</p>
                                  <p className="mdr">Comisión: ${payment.comission}</p>
                                </td>
                              </tr>
                            )}

                          </tbody>
                        </table> </div>
                          : <div className="row">
                            <div className="col-lg-3 col-md-4"></div>

                            <div className="col-lg-6 col-md-6">
                              <h5>No se tienen operaciones registradas </h5><br></br>
                            </div>
                          </div>}
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">

              <div className="side-items">
                <Recipients />

                <div className="single-item">
                  {/* Linked Payment System */}
                  <LinkedPaymentSystem data={allCards} noCards={noCards} />
                </div>
                <div className="single-item">
                  <div className="section-text d-flex align-items-center justify-content-between">
                    <h6>Desglose de pagos</h6>
                  </div>

                  {/* Chart */}
                  <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                    width="380"
                  />
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      <TransactionModal data={selectedTransacction} />

    </section>
  );
};

export default DashboardMain;
