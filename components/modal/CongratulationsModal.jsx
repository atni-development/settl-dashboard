import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import success from "/public/images/icon/success.png";

const CongratulationsModal = () => {
  return (
    <div className="congratulations-popup purchased-popup">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="modal fade"
              id="congratulationsMod"
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
                    <h4 className="mb-30">Solicitud enviada</h4>
                    <p>
                      Tu solicitud de pago por el montó de $30,000.00 MXN ha sido enviada exitosamente, se enviará un correo de confirmación en cuanto se haya efectuado el pago.
                    </p>
                    <Link href="/" className="mt-40">
                      Regresar al panel principal
                    </Link>
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

export default CongratulationsModal;
