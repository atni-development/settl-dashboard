import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import success from "/public/images/icon/success.png";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const CardsCongratulationsModal = () => {
  const [currentAmount, setCurrentAmout] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      var currentAmount = localStorage.getItem('amountToPay');
      setCurrentAmout(currentAmount);
    }
  }, []);


  const onClose = event => {
    try{
      var userId = localStorage.getItem('userId').trim();

      localStorage.removeItem(userId + 'bc_session_date');
      localStorage.removeItem(userId + 'bc_current_card');
      localStorage.removeItem(userId + 'bc_amountToPay');
      localStorage.removeItem(userId + 'bc_commisionToPay');
      localStorage.removeItem(userId + 'bc_paying_card');
    }catch(e){
      //console.log(e);
    }
    router.push("/");
  }

  return (
    <div className="congratulations-popup purchased-popup">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="modal fade"
              id="cardsCongratulationsMod"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i>
                        <FaTimes />
                      </i>
                    </button>
                  </div>
                  <div className="main-content text-center pt-120 pb-120">
                    <Image className="mb-60" src={success} alt="icon" />
                    <h4 className="mb-30">Pago aprobado</h4>
                    <p>
                    En las próximas 24 horas hábiles recibirás un correo confirmando que tu pago “Entre Tarjetas” con Settl ha sido aplicado con éxito.
                    </p>
                  
                    <Link
                    href=""
                            type="button"
                            className="mt-40"
                            data-bs-toggle="modal"
                            data-bs-target="#cardsCongratulationsMod"
                            onClick={onClose}
                          > Regresar al inicio</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsCongratulationsModal;
