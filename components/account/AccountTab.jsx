import Image from "next/image";
import confirm from "/public/images/icon/confirm.png";
import not_confirm from "/public/images/icon/not-confirm.png";
import pending from "/public/images/icon/pending.png";
import owner_profile_2 from "/public/images/owner-profile-2.png";

const AccountTab = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="account"
      role="tabpanel"
      aria-labelledby="account-tab"
    >
      <div className="upload-avatar">
        <div className="avatar-left d-flex align-items-center">
          <div className="profile-img">
            <Image src={owner_profile_2} alt="image" />
          </div>
          <div className="instraction">
            <h6>Tu Avatar</h6>
            <p>Tamaño máximo: 400px x 400px</p>
          </div>
        </div>
        <div className="avatar-right">
          <div className="file-upload">
            <div className="right-area">
              <label className="file">
                <input type="file" />
                <span className="file-custom"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <form action="#">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="fName1">Nombre</label>
              <input type="text" id="fName1" placeholder="María" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="lName1">Apellidos</label>
              <input type="text" id="lName1" placeholder="Pérez García" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="email1">Correo electrónico</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <input
                    type="text"
                    id="email1"
                    placeholder="ejemplo@gmail.com"
                  />
                </div>
                <div className="col-6">
                  <span className="pending">
                    <Image src={pending} alt="icon" />
                    Pendiente de confirmación
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="phone1">Teléfono</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <input type="text" id="phone1" placeholder="(316) 555-0116" />
                </div>
                <div className="col-6">
                  <span className="confirm">
                    <Image src={confirm} alt="icon" />
                    Número de teléfono confirmado
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input file">
              <label>Identificación</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <div className="file-upload">
                    <div className="right-area">
                      <label className="file">
                        <input type="file" />
                        <span className="file-custom"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <span className="notconfirm">
                    <Image src={not_confirm} alt="icon" />
                    Indentidad por confirmar
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                placeholder="Av. de los Insurgentes Sur 724, Col del Valle Nte, Benito Juárez, 03100 Ciudad de México, CDMX"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="btn-border">
              <button className="cmn-btn">Guardar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountTab;
