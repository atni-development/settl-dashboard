import Pagination from "@/components/pagination/Pagination";
import Filter from "@/components/transactions/Filter";
import Image from "next/image";
import Link from "next/link";
import csv from "/public/images/icon/csv.png";
import excel from "/public/images/icon/excel.png";
import pdf from "/public/images/icon/pdf.png";
import printer from "/public/images/icon/printer.png";
import search from "/public/images/icon/search.png";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import TransactionModal from "../modal/TransactionModal";

import Select from "../select/Select";
import { Col } from "reactstrap";

const TransactionsMain = () => {


  const balance = [
    { id: "all", name: "Todas las transacciones" },
    { id: "Pendiente", name: "Pendientes" },
    { id: "Completada", name: "Canceladas" },
    { id: "En progreso", name: "En progreso" },
    { id: "Completada", name: "Completada" },
  ];

  /*const filters = [
    { id: 1, name: "Todas las tarjetas" },
    { id: 2, name: "Tarjeta Santader ***4089" },
    { id: 3, name: "Tarjeta American Express ***4083" },
    { id: 4, name: "Tarjeta Bancomer ***4083" },
    { id: 5, name: "Tarjeta Banorte ***3833" },
  ];*/

  const [filters, setFilters] = useState([
    { id: 1, name: "Todas las tarjetas" }
  ]);

  const [dateFilters, setDateFilters] = useState([
    { id: "all", name: "Todos los meses" },
  ]);

  const [selectedTransacction, setSelectedTransaction] = useState({});

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [transactions, setTransactions] = useState([]);
  //const [loadong, setLoading] = useState(false);
  //const [selectedFilter, setSelectedFilter] = useState({});

  function onFilterChange(e) {
    console.log(e);
    //setSelectedFilter(e);
    if (e.id == 'all') {
      setFilteredTransactions(transactions);
    } else {
      var filtered = transactions.filter((transaction) => {
        return transaction.card.cardNumber == e.id;
      });
      setFilteredTransactions(filtered);
    }
  }

  function onStatusFilterChange(e) {
    //console.log(e);
    //setSelectedFilter(e);
    if (e.id == 'all') {
      setFilteredTransactions(transactions);
    } else {
      var filtered = transactions.filter((transaction) => {
        return transaction.paymentStatus == e.id;
      });
      setFilteredTransactions(filtered);
    }
  }

  function onDateFilterChange(e) {
    console.log(e);
    //setSelectedFilter(e);
    if (e.id == 'all') {
      setFilteredTransactions(transactions);
    }else{
    var filtered = transactions.filter((transaction) => {
      var date = transaction.requested_date.toDate().toLocaleDateString().split("/");
      //console.log(date);
      return date[0] == e.id.split("-")[0] && date[2] == e.id.split("-")[1];
    });
    setFilteredTransactions(filtered);
  }
  }
  

  function onClearFilters() {
    //setSelectedFilter({id: 'all', name: 'Todas las transacciones'});
    setFilteredTransactions(transactions);
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      var db = getFirestore();
      //setLoading(true);
      let userId = localStorage.getItem('userId').trim();
      var collectionPath = "Users/" + userId + "/payment_requests";
      const q = collection(db, collectionPath);
      onSnapshot(q, (querySnapshot) => {
        var transactions = [];
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          data.firestoreID = doc.id;
          transactions.push(data);
        });
        console.log("Transactions: ");
        console.log(transactions);
        transactions.sort((a, b) => {
          return b.requested_date.toDate() - a.requested_date.toDate();
        });
        if (transactions.length > 0) {
          var filtersMap = new Map();
          filtersMap.set('all', "Todas las tarjetas");
          var datesMap = new Map();
          datesMap.set('all', "Todos los meses");
          transactions.forEach((transaction) => {

            var date = transaction.requested_date.toDate().toLocaleDateString()
            var readableFilter = transaction.requested_date.toDate().toLocaleDateString("es-MX", { year: "numeric", month:"long"})

            var splitdate = date.split("/");
            var month = splitdate[0];
            var year = splitdate[2];
            var datekey = month + "-" + year;
            if (!datesMap.has(datekey)) {
              datesMap.set(datekey, readableFilter);
            }

            var last4digits = transaction.card.cardNumber.substr(transaction.card.cardNumber.length - 4);
            if (!filtersMap.has(transaction.card.cardNumber)) {
              filtersMap.set(transaction.card.cardNumber, "Tarjeta ****" + last4digits);
            }

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
              
              transaction.chargeClassColor = "completed";
            }
            if (transaction.chargeStatus.toLowerCase() == "error") {
              transaction.chargeClassColor = "cancelled";
            }
          });

          var filtersArray = [];
          filtersMap.keys().forEach((key) => {
            filtersArray.push({ id: key, name: filtersMap.get(key) });
          });
          var datesArray = [];

          datesMap.keys().forEach((key) => {
            datesArray.push({ id: key, name: datesMap.get(key) });
          });
          
          setDateFilters(datesArray);
          setFilters(filtersArray);
          setFilteredTransactions(transactions);
          setTransactions(transactions);
          //setCurrentCard(cards[0]);
        } else {
          setTransactions([]);
        }

      })
    }
  }, []);

  return (
    <section className="dashboard-section body-collapse transactions">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="head-area">
            <div className="row">
              <div className="col-lg-5 col-md-4">
                <h4>Transacciones</h4>
              </div>
              <div className="col-lg-7 col-md-8">
                <div className="transactions-right d-flex align-items-center">
                  <form action="#" className="flex-fill">
                    <div className="form-group d-flex align-items-center">
                      <Image src={search} alt="icon" />
                      <input type="text" placeholder="Escribe tu búsqueda..." />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="transactions-main">
                <div className="top-items">
                  <h6>Todas las transacciones</h6>
                  <div className="export-area">
                    {/*   <ul className="d-flex align-items-center">
                      <li>
                        <Link href="#">
                          <Image src={printer} alt="icon" />
                          Imprimir
                        </Link>
                      </li>
                    
                    </ul> */}
                  </div>
                </div>
                {/* Filter */}
                <div className="filters-item">
                  <div className="single-item">
                    {/* Select  */}
                    <Select data={dateFilters}  setSharedState={onDateFilterChange}  btn="border" />
                  </div>
                  <div className="single-item">
                    {/* Select */}
                    <Select data={balance} setSharedState={onStatusFilterChange} btn="border" />
                  </div>
                  <div className="single-item">
                    {/* Select */}
                    <Select data={filters} setSharedState={onFilterChange} btn="border" />
                  </div>
                  <div className="single-item">
                    <button onClick={onClearFilters}>Quitar filtros</button>
                  </div>
                </div>

                {filteredTransactions.length > 0 ? <div className="table-responsive"> <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Estado del cargo</th>
                      <th scope="col">Estado del pago</th>

                      <th scope="col">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map(payment =>
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
                          <p className="mdr">{payment.requested_date.toDate().toLocaleDateString("es-MX", {day: "numeric", year: "numeric", month:"short"})}</p>
                        </td>
                        <td>
                          <p className={payment.chargeClassColor}>{payment.message == "Success"? "Completado": payment.message}</p>
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
                    <div className="col-lg-5 col-md-4"></div>

                    <div className="col-lg-5 col-md-4">
                      <h5>No se tienen transacciones registradas </h5><br></br>
                    </div></div>}

                {/* {filteredTransactions.length > 0 ? <Pagination /> : <div></div>} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TransactionModal data={selectedTransacction} />
    </section>
  );
};

export default TransactionsMain;
