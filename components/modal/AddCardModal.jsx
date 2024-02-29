import { FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { addDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import axios from 'axios';

const AddCardModal = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bank, setBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCVV, setCardCvv] = useState("");
  const [validTrhuMonth, setValidTrhuMonth] = useState('01');
  const [validTrhuyear, setValidYear] = useState("2024");
  const [cardHolderName, setCardHolderName] = useState("");
  const [closingMonth, setClosingMonth] = useState('January');
  const [closingDay, setClosingDay] = useState(1);
  const [information, setInformation] = useState(null);

  const [postalCode, setPostalCode] = useState("");
  const [stateCity, setStateCity] = useState("Ciudad de México");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("México");

  const closeRef = useRef()
  const cardNumberRef = useRef()
  const bankRef = useRef()
  const nameRef = useRef()
  const monthRef = useRef()
  const yearRef = useRef()
  const cvvRef = useRef()
  const closingMonthRef = useRef()
  const closingDayRef = useRef()

  const postalRef = useRef()
  const stateRef = useRef()
  const cityRef = useRef()
  const streetRef = useRef()
  const countryRef = useRef()

  const [availableDays, setAvailableDays] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]);

  var fullmonth = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];

  var hathMonth = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 20, 21, 22
  ];

  var febDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 28
  ];
  var mexStatesAccented = 
  [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Coahuila',
    'Colima',
    'Ciudad de México',
    'Durango',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Estado de México',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
  ];
  var countrys = ["México"];

  var months = [
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
  ];
  var years = [
     "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030","2031", "2032", "2033", "2034", "2035"
  ];

  var cardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/

  const handleMonthChange = (event) => {
    console.log(event.target.value);
    setClosingMonth(event.target.value);
    if (event.target.value == "February") {
      console.log("Setting February");
      setAvailableDays(febDays);
    } else {
      if (event.target.value == "April" || event.target.value == "June" || event.target.value == "September" || event.target.value == "November") {
        setAvailableDays(hathMonth);
      } else {
        setAvailableDays(fullmonth);
      }
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    setError(null)
    setInformation(null);
    var error = false;
    /*if (bank == "") {
      error = true;
      //closeRef.current.click()
      setError("Debes ingresar el banco receptor");
    }*/
    if(postalCode === ""){
      error = true;
      setError("Debes ingresar el código postal de la dirección de facturación");
    }
    if(street === ""){
      error = true;
      setError("Debes ingresar la calle y el número de la dirección de facturación");
    }
   
    if(city === ""){
      error = true;
      setError("Debes ingresar la ciudad de la dirección de facturación");
    }
    if(closingMonth === "February" && closingDay > 28){
      error = true;
      setError("El día de corte no puede ser mayor a 28 para el mes de Febrero");
    }
    if (cardNumber === "") {
      error = true;
      setError("Debes ingresar el número de tarjeta");
    }
    if (cardCVV === "") {
      error = true;
      setError("Debes ingresar el CVV de la tarjeta");
    }
    if (validTrhuMonth === "") {
      error = true;
      setError("Debes ingresar el mes de vencimiento de la tarjeta");
    }
    if (validTrhuyear === "") {
      error = true;
      setError("Debes ingresar el año de vencimiento de la tarjeta");
    }
    if (cardHolderName === "") {
      error = true;
      setError("Debes ingresar el nombre del titular de la tarjeta");
    }
    if (!cardNumber.match(cardRegex)) {
      error = true;
      setError("El número de la tarjeta introducido es inválido");
    }
   
    if (error == false) {
      const options = {
        method: 'POST',
        url: 'https://bin-ip-checker.p.rapidapi.com/',
        params: { bin: cardNumber.substring(0, 6) },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b03649ea75msheaca750379d398cp146a4fjsn663e8bb43948',
          'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com'
        },
        data: { bin: cardNumber.substring(0, 6) }
      };

      try {
        setLoading(true);
        const response = await axios.request(options);
        console.log(response.data);
        setLoading(false);
        if (response.data.code == 200) {
          console.log("BIN RESPONSE");
          if (response.data.BIN.brand === "VISA" || response.data.BIN.brand === "MASTERCARD") {
            console.log("Tarjeta válida");
            setBank(response.data.BIN.issuer.name);
            if (response.data.BIN.type !== "CREDIT") {
              setError("La tarjeta introducida es de débito, por favor verifica que la información sea correcta.");
            } else {
              if (response.data.BIN.currency !== "MXN") {
                setError("La tarjeta debe de estar en pesos mexicanos para poder ser utilizada en la plataforma. Por favor verifica que la información sea correcta.");
              } else {
                var db = getFirestore();
                let userId = localStorage.getItem('userId').trim();
                var collectionRoute = "Users/" + userId + "/cards";
                console.log("Collection route: " + collectionRoute)
                const q = collection(db, collectionRoute);
                try{
                  getDocs(q).then((querySnapshot) => {
                  console.log("SNAPSHOW");
                  console.log(querySnapshot);
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data());
                    if(doc.data().cardNumber == cardNumber){
                      error = true;
                    }
                });
                  if (error) {
                    error = true;
                    setError("La tarjeta ya ha sido registrada en tu cuenta");
                  } else {
                    console.log("La tarjeta no ha sido registrada");
                    var cardData = {
                      status: "ACTIVE",
                      bank: response.data.BIN.issuer.name,
                      cardNumber: cardNumber,
                      cardCVV: cardCVV,
                      validTrhuMonth: validTrhuMonth,
                      validTrhuYear: validTrhuyear,
                      cardHolderName: cardHolderName,
                      closingMonth: closingMonth,
                      closingDay: closingDay,
                      city: city,
                      street: street,
                      postalCode: postalCode,
                      country: "México",
                      state: stateCity,
                      country_code: "MX",
                    }
                    cardData.bin = response.data.BIN;
                    addDoc(collection(db, collectionRoute), cardData).then((docRef) => {
                      setError(null);
                      setInformation("La tarjeta ha sido verificada exitosamente");
                      setSuccess(true);
  
                      if (bankRef && bankRef.current) {
                        bankRef.current.value = response.data.BIN.issuer.name;
                      }
                    })
                      .catch((error) => {
                        setLoading(false);
                        setError("Se produjo un error al obtener el perfil del usuario. Error 201")
                        console.error("Error writing document: ", error);
                      });
                  }
                }) .catch((error) => {
                  setLoading(false);
                  setError("Se produjo un error al obtener el perfil del usuario. Error 205")
                  console.error("Error writing document: ", error);
                });
                }catch(error){
                  setLoading(false);
                  console.log("ERROR EN EL REQUEST DE FIREBASE")
                  console.error(error);
                }
              }


            }

          } else {
            error = true;
            setError("La tarjeta introducida no es válida, el proceso sólo es compatible con Visa y Mastercard.");
          }
        } else {
          error = true;
          setError("Se produjo un error al verficar la numeración de la tarjeta. Por favor revisa que la información proporcionada sea correcta.");
        }
      } catch (error) {
        error = true;
        setError("Se produjo un error al verficar la numeración de la tarjeta. Por favor revisa que la información proporcionada sea correcta y que tu conexión a internet sea estable.");
        setLoading(false);
        console.log("ERROR EN EL REQUEST")
        console.error(error);
        console.error(error.message);
      }


    } else {
      console.log("Error en el formulario");
    }

  }

  const onSubmitClone = event => {
    setSuccess(true);
  }

  const setCVV = event => {
    console.log("CVV: " + event.length);
    if (isNaN(event)) {
      cvvRef.current.value = "";
    } else {
      if (event.includes('-')) {
        cvvRef.current.value = "";
      } else {
        if (event.length > 3) {
          var sub = event.substring(0, 3);
          cvvRef.current.value = sub;
          setCardCvv(sub);
        } else {
          setCardCvv(event);
        }
      }
    }
  }

  const setPostal = event => {
    if (isNaN(event)) {
      postalRef.current.value = "";
    } else {
      if (event.includes('-')) {
        postalRef.current.value = "";
      } else {
        if (event.length > 5) {
          var sub = event.substring(0, 5);
          postalRef.current.value = sub;
          setPostalCode(sub);
        } else {
          setPostalCode(event);
        }
      }
    }
  }


  const onClose = event => {
    console.log("ON CLOSE");
    closeRef.current.click();
    setLoading(false);
    setError(null);
    setSuccess(false);
    setCardCvv("");
    setCardNumber("");
    setClosingMonth("January");
    setClosingDay(1);
    setInformation(null);
    setStateCity("Ciudad de México");
    setCity("");
    setStreet("");
    setPostalCode("");
    setCardHolderName("");
    setValidTrhuMonth("");
    setValidYear("");
    cardNumberRef.current.value = "";
    nameRef.current.value = "";
    monthRef.current.value = "";
    yearRef.current.value = "";
    cvvRef.current.value = "";
    closingMonthRef.current.value = "January";
    closingDayRef.current.value = 1;
    if (bankRef && bankRef.current) {
      bankRef.current.value = "";
    }
  }

  const handleBankChange = (event) => {
    console.log(event.target.value);
    setBank(event.target.value);
  };

  const handleClosingDay = (event) => {
    console.log(event.target.value);
    setClosingDay(event.target.value);
  };

  const handleStateChange = (event) => {
    console.log(event.target.value);
    setStateCity(event.target.value);
  };


  const handleValidThruMonth = (event) => {
    console.log(event.target.value);
    setValidTrhuMonth(event.target.value);
  };
  const handleValidThruYear = (event) => {
    console.log(event.target.value);
    setValidYear(event.target.value);
  };

  return (
    <div className="add-card">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div className="modal fade" id="addcardMod" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header justify-content-between">
                    <h6>Agregar tarjeta de crédito</h6>
                    <button
                      hidden
                      type="button"
                      className="btn-close"
                      ref={closeRef}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i>
                        <FaTimes />
                      </i>
                    </button>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={onClose}
                      //data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i>
                        <FaTimes />
                      </i>
                    </button>
                  </div>
                  <form action="#">
                    {error && <Alert color="danger">{error}</Alert>}
                    {information && <Alert color="success">{information}</Alert>}

                    <div className="row justify-content-center">
                      {success ? <div className="col-md-12">
                        <div className="single-input">
                          <label htmlFor="cardHolder">Banco receptor</label>
                          <input
                            ref={bankRef}
                            disabled
                            onChange={handleBankChange}
                            type="text"
                            value={bank}
                            id="cardHolder"
                            placeholder="Santander"
                          />
                        </div>
                      </div> : null}
                   
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="cardHolder">Nombre en la tarjeta</label>
                          <input
                            ref={nameRef}
                            type="text"
                            id="cardHolder"
                            placeholder="María Pérez"
                            onChange={(event) => setCardHolderName(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="cardNumber">Número de tarjeta</label>
                          <input
                            type="text"
                            ref={cardNumberRef}
                            id="cardNumber"
                            placeholder="5890 - 6858 - 6332 - 9843"
                            onChange={(event) => setCardNumber(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="month">Mes</label>
                           <select ref={monthRef} value={validTrhuMonth} onChange={handleValidThruMonth} className="w-100">
                            {months.map((itm) => (
                              <option value={itm}  key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="year">Año</label>
                          <select ref={yearRef} value={validTrhuyear} onChange={handleValidThruYear} className="w-100">
                            {years.map((itm) => (
                              <option value={itm}  key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="year">CVV</label>
                          <input
                            ref={cvvRef}
                            type="number" id="cvv" placeholder="***"
                            maxlength="3"
                            onChange={(event) => setCVV(event.target.value)} />
                        </div>
                      </div>
                    

                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="year">Mes de corte</label>
                          <select ref={closingMonthRef} value={closingMonth} onChange={handleMonthChange} className="w-100">
                            <option value="January">Enero</option>
                            <option value="February">Febrero</option>
                            <option value="March">Marzo</option>
                            <option value="April">Abril</option>
                            <option value="May">Mayo</option>
                            <option value="June">Junio</option>
                            <option value="July">Julio</option>
                            <option value="August">Agosto</option>
                            <option value="September">Septiembre</option>
                            <option value="October">Octubre</option>
                            <option value="November">Noviembre</option>
                            <option value="December">Diciembre</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="year">Día de corte</label>
                          <select ref={closingDayRef} value={closingDay} onChange={handleClosingDay} className="w-100">
                            {availableDays.map((itm) => (
                              <option value={itm}  key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="postal">Código postal</label>
                          <input
                            ref={postalRef}
                            type="number" id="postal" placeholder="01000"
                            maxlength="5"
                            onChange={(event) => setPostal(event.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="single-input">
                          <label htmlFor="postal">Dirección</label>
                          <input
                            ref={streetRef}
                            type="text" id="street" placeholder="Calle #123"
                            maxlength="500"
                            onChange={(event) => setStreet(event.target.value)} />
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="postal">Ciudad o colonia</label>
                          <input
                            ref={cityRef}
                            type="text" id="city" placeholder="Ciudad "
                            onChange={(event) => setCity(event.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="postal">Estado</label>
                          <select ref={stateRef} value={stateCity} onChange={handleStateChange} className="w-100">
                            {mexStatesAccented.map((itm) => (
                              <option value={itm}  key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="postal">País</label>
                          <select ref={countryRef} value={country} className="w-100">
                            {countrys.map((itm) => (
                              <option value={itm}  key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <img src="/images/cards_accepted.png" alt="icon" />

                      <div className="col-12">
                        <div className="btn-border w-100">

                          {success ? <button onClick={onClose} className="cmn-btn-success w-100">Continuar</button> : !loading ? <button onClick={onSubmit} className="cmn-btn w-100">Agregar tarjeta</button> : <button className="cmn-btn-dis w-100" disabled>Agregando tarjeta...   <div className="loader"></div></button>}
                          {/*   <button
                            //ref={closeRef}
                            onClick={onClose} 
                            type="button"
                            className="reg w-100 p-0"
                            data-bs-toggle="modal"
                            data-bs-target="#addcardMod"
                          ></button> */}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
