import Image from "next/image";
import Link from "next/link";
import imac from "/public/images/icon/imac.png";
import ipad from "/public/images/icon/ipad.png";
import iphone from "/public/images/icon/iphone.png";

const SecurityTab = () => {
  return (
    <div
      className="tab-pane fade"
      id="security"
      role="tabpanel"
      aria-labelledby="security-tab"
    >
      <div className="single-content authentication d-flex align-items-center justify-content-between">
        <div className="left">
          <h5>Autenticación de dos factores</h5>
          <p>
          La Autenticación de dos factores(2FA) es últil para proteger tu cuenta de accesos no autorizados.
          </p>
        </div>
        <div className="right">
          <button>Activar</button>
        </div>
      </div>
      <div className="change-pass mb-40">
        <div className="row">
          <div className="col-sm-6">
            <h5>Cambiar la contraseña</h5>
            <p>
              Puede cambiar la contraseña si siente que su cuenta ha sido comprometida, o en la página de iniciar sesión si la olvidó
            </p>
            <Link href="#">¿Olvidó la contraseña?</Link>
          </div>
          <div className="col-sm-6">
            <form action="#">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="current-password">Contraseña actual</label>
                    <input
                      type="text"
                      id="current-password"
                      placeholder="Mínimo 8 caracteres, con un número y una letra"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="new-password">Nueva contraseña</label>
                    <input
                      type="text"
                      id="new-password"
                      placeholder="*********"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="confirm-password">
                      Confirmar contraseña
                    </label>
                    <input
                      type="text"
                      id="confirm-password"
                      placeholder="*********"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="btn-border w-100">
                    <button className="cmn-btn w-100">Actualizar contraseña</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="single-content additional-security">
        <h5>Seguridad adicional</h5>
    
        <div className="single-setting">
          <div className="left">
            <h6>MFA</h6>
            <p>Google Authenticator</p>
          </div>
          <div className="right">
            <button>Confirugar</button>
          </div>
        </div>
        <div className="single-setting">
          <div className="left">
            <h6>Certificado de seguirdad</h6>
            <p>Secure Sockets Layer</p>
          </div>
          <div className="right">
            <button>Activado</button>
          </div>
        </div>
      </div>
      <div className="single-content your-devices">
        <div className="head-item d-flex align-items-center justify-content-between">
          <h5>Your devices</h5>
          <Link href="#">Cerrar sesión en todos los dispositivos</Link>
        </div>
        <div className="single-setting">
          <div className="left">
            <div className="icon-area">
              <Image src={iphone} alt="icon" />
            </div>
            <div className="text-area">
              <h6>iPhone 13 Pro Max</h6>
              <p>Ciudad de México· 20 de Febrero a las 03:00 pm</p>
            </div>
          </div>
          <div className="right">
            <button>Cerrar sesión</button>
          </div>
        </div>
        <div className="single-setting">
          <div className="left">
            <div className="icon-area">
              <Image src={ipad} alt="icon" />
            </div>
            <div className="text-area">
              <h6>iPad Pro</h6>
              <p>Ciudad de México· 20 de Febrero a las 03:00 pm</p>
            </div>
          </div>
          <div className="right">
          <button>Cerrar sesión</button>
          </div>
        </div>
        <div className="single-setting">
          <div className="left">
            <div className="icon-area">
              <Image src={imac} alt="icon" />
            </div>
            <div className="text-area">
              <h6>iMac OSX</h6>
              <p>Ciudad de México· 20 de Febrero a las 03:00 pm</p>
            </div>
          </div>
          <div className="right">
          <button>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
