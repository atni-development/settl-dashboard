const NotificationTab = () => {
  return (
    <div
      className="tab-pane fade"
      id="notification"
      role="tabpanel"
      aria-labelledby="notification-tab"
    >
      <div className="notification-single">
        <h6>Anuncios</h6>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Confirmaciones de pagos</h6>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Solicitudes realizafas</h6>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Problemas con algún método de pago</h6>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Promociones</h6>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Actualizaciones en su cuenta</h6>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default NotificationTab;
