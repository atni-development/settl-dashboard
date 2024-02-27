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


const TransactionsMain = () => {
  const [transactions, setTransactions] = useState([]);
  const [loadong, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      //setCurrentCard(card);
      var db = getFirestore();
      setLoading(true);
      let userId = localStorage.getItem('userId').trim();
      var collectionPath = "Users/" + userId + "/payment_requests";
      const q = collection(db, collectionPath);
      onSnapshot(q, (querySnapshot) => {
        var transactions = [];
        querySnapshot.forEach((doc) => {
          transactions.push(doc.data());
        });
        console.log("Transactions: ");
        console.log(transactions);
        if (transactions.length > 0) {
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
                <Filter />
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        data-bs-toggle="modal"
                        data-bs-target="#transactionsMod"
                      >
                        <th scope="row">
                        <p>Tarjeta Santader ***4089</p>
                    <p className="mdr">Pago a tarjeta</p>
                        </th>
                        <td>
                          <p>03:00 PM</p>
                          <p className="mdr">10 Mar 2022</p>
                        </td>
                        <td>
                          <p className="inprogress">En progreso</p>
                        </td>
                        <td>
                        <p>$30,000.00</p>
                    <p className="mdr">Comisión: $700.00</p>
                        </td>
                      </tr>
                    
                      <tr
                        data-bs-toggle="modal"
                        data-bs-target="#transactionsMod"
                      >
                        <th scope="row">
                        <p>Tarjeta American Express ***4083</p>
                    <p className="mdr">Pago a tarjeta</p>
                        </th>
                        <td>
                          <p>07:05 PM</p>
                          <p className="mdr">15 Mar 2022</p>
                        </td>
                        <td>
                          <p className="pending">Pendiente</p>
                        </td>
                        <td>
                          <p>$2000.00</p>
                          <p className="mdr">Sin comisión</p>
                        </td>
                      </tr>
                      <tr
                        data-bs-toggle="modal"
                        data-bs-target="#transactionsMod"
                      >
                        <th scope="row">
                        <p>Tarjeta Bancomer ***4083</p>
                    <p className="mdr">Pago a tarjeta</p>
                        </th>
                        <td>
                          <p>04:02 PM</p>
                          <p className="mdr">10 Mar 2022</p>
                        </td>
                        <td>
                          <p className="completed">Completada</p>
                        </td>
                        <td>
                          <p>$35,000.00</p>
                          <p className="mdr">Comisión $350.00</p>
                        </td>
                      </tr>
                      <tr
                        data-bs-toggle="modal"
                        data-bs-target="#transactionsMod"
                      >
                        <th scope="row">
                        <p>Tarjeta Banorte ***383</p>
                    <p className="mdr">Pago a tarjeta</p>
                        </th>
                        <td>
                          <p>11:00 PM</p>
                          <p className="mdr">21 Mar 2022</p>
                        </td>
                        <td>
                          <p className="cancelled">Cancelada</p>
                        </td>
                        <td>
                        <p>$35,000.00</p>
                          <p className="mdr">Comisión $350.00</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsMain;
