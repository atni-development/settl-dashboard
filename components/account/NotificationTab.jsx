import { useState, useEffect, useRef } from 'react';

const NotificationTab = () => {
  const [announcment, setAnnouncement] = useState(true);
  const [payment, setPayment] = useState(true);
  const [requests, setRequests] = useState(true);
  const [problems, setProblems] = useState(true);
  const [promos, setPromos] = useState(true);
  const [updates, setUpdates] = useState(true);

  function onAnnouncementChange(e) {
    setAnnouncement(e.target.checked);
    console.log(e);  
  }

  function onConfirmationChange(e) {
    setPayment(e.target.checked);
    console.log(e);  
  }

  function onProblemsChange(e) {
    setProblems(e.target.checked);
    console.log(e);  
  }
  function onPromoChange(e) {
    setPromos(e.target.checked);
    console.log(e);  
  }
  function onApplicationChange(e) {
    setRequests(e.target.checked);
    console.log(e);  
  }
  function onAccountUpdateChange(e) {
    setAnnouncement(e.target.checked);
    console.log(e);  
  }

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
          <input type="checkbox" onChange={onAnnouncementChange} defaultChecked={announcment}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Confirmaciones de pagos</h6>
        <label className="switch">
          <input type="checkbox" onChange={onConfirmationChange}  defaultChecked={payment}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Solicitudes realizadas</h6> 
        <label className="switch">
          <input type="checkbox" onChange={onApplicationChange}  defaultChecked={requests}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Problemas con algún método de pago</h6>
        <label className="switch">
          <input type="checkbox" onChange={onProblemsChange}  defaultChecked={problems}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Promociones</h6>
        <label className="switch">
          <input type="checkbox" onChange={onPromoChange}  defaultChecked={promos}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-single">
        <h6>Actualizaciones en su cuenta</h6>
        <label className="switch">
          <input type="checkbox" onChange={onAccountUpdateChange}  defaultChecked={updates}/>
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default NotificationTab;
