import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import watch from "/public/images/icon/watch.png";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const PendingModal = () => {
  const [currentAmount, setCurrentAmout] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      var currentAmount = localStorage.getItem('amountToPay');
      setCurrentAmout(currentAmount);
      console.log("Current amount: " + currentAmount);
    }
  }, []);


  const onClose = event => {
    console.log("ON CLOSE");
    var userId = localStorage.getItem('userId').trim();

    localStorage.removeItem(userId+'session_date');
    localStorage.removeItem(userId+'current_card');
    localStorage.removeItem(userId+'amountToPay');
    localStorage.removeItem(userId+'commisionToPay');
    router.push("/");
  }

  return (
    <div className="congratulations-popup purchased-popup">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="modal fade"
              id="pendingMod"
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
                    <Image className="mb-60" src={watch} alt="icon" />
                    <h4 className="mb-30">Pago en proceso</h4>
                    <p>
                      El pago esta en proceso de verificación, se enviará una notificación por correo electrónico en cuanto la transacción se haya confirmado.
                    </p>
                  
                    <Link
                    href=""
                            type="button"
                            className="mt-40"
                            data-bs-toggle="modal"
                            data-bs-target="#pendingMod"
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

export default PendingModal;
