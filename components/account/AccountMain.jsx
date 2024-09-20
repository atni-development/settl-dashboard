import AccountTab from "./AccountTab";
import NotificationTab from "./NotificationTab";
import OwnerDetails from "./OwnerDetails";
import PaymentMethodTab from "./PaymentMethodTab";
import SecurityTab from "./SecurityTab";

const AccountMain = () => {
  return (
    <section className="dashboard-section body-collapse account">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="row">
              <div className="col-xxl-3 col-xl-4 col-md-6">
                {/* Owner Details */}
                <OwnerDetails />
              </div>
              <div className="col-xxl-9 col-xl-8">
                <div className="tab-main">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="account-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#account"
                        type="button"
                        role="tab"
                        aria-controls="account"
                        aria-selected="true"
                      >
                        Cuenta
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="security-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#security"
                        type="button"
                        role="tab"
                        aria-controls="security"
                        aria-selected="false"
                      >
                        Seguridad
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="payment-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#payment"
                        type="button"
                        role="tab"
                        aria-controls="payment"
                        aria-selected="false"
                      >
                        Métodos de pago
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="notification-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#notification"
                        type="button"
                        role="tab"
                        aria-controls="notification"
                        aria-selected="false"
                      >
                        Notificaciones
                      </button>
                    </li> */}
                  </ul>
                  <div className="tab-content mt-40">
                    {/* Account Tab */}
                    <AccountTab />

                    {/* Security Tab */}
                    <SecurityTab />

                    {/* PaymentMethod Tab */}
                    <PaymentMethodTab />

                    {/* Notification Tab */}
                    <NotificationTab />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountMain;
