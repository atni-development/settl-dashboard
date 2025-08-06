import { FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { addDoc, getDoc, getDocs, collection, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import InputMask from 'react-input-mask';

const AddCardModal = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bank, setBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validTrhuMonth, setValidTrhuMonth] = useState('01');
  const [validTrhuyear, setValidYear] = useState("2024");
  const [cardHolderName, setCardHolderName] = useState("");
  const [closingMonth, setClosingMonth] = useState('January');
  const [closingDay, setClosingDay] = useState("");
  const [information, setInformation] = useState(null);
  const [cardType, setCardType] = useState("");
  const [cardMask, setCardMask] = useState("9999 - 9999 - 9999 - 9999");

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

  var closingDays =
    ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]



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
    "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"
  ];

  // Separate regex patterns for each card type for better validation
  const cardPatterns = {
    amex: /^3[47][0-9]{13}$/,                    // American Express: 15 digits, starts with 34 or 37
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,           // Visa: 13 or 16 digits, starts with 4
    mastercard: /^(?:5[1-5][0-9]{14}|2[2-7][0-9]{14})$/ // Mastercard: 16 digits, starts with 51-55 or 22-27
  };

  const validateCardNumber = (number, cardType) => {
    const cleanNumber = number.replace(/\D/g, '');

    switch (cardType) {
      case 'amex':
        return cardPatterns.amex.test(cleanNumber);
      case 'visa':
        return cardPatterns.visa.test(cleanNumber);
      case 'mastercard':
        return cardPatterns.mastercard.test(cleanNumber);
      default:
        // If card type is unknown, test against all patterns
        return Object.values(cardPatterns).some(pattern => pattern.test(cleanNumber));
    }
  };

  const detectCardType = (number) => {
    // Remove all non-numeric characters
    const cleanNumber = number.replace(/\D/g, '');

    // American Express starts with 34 or 37
    if (cleanNumber.match(/^3[47]/)) {
      return 'amex';
    }
    // Visa starts with 4
    else if (cleanNumber.match(/^4/)) {
      return 'visa';
    }
    // Mastercard starts with 51-55 or 22-27
    else if (cleanNumber.match(/^5[1-5]/) || cleanNumber.match(/^2[2-7]/)) {
      return 'mastercard';
    }

    return 'unknown';
  };

  const getCardMask = (cardType) => {
    switch (cardType) {
      case 'amex':
        return '9999 - 999999 - 99999'; // 4-6-5 format for American Express
      case 'visa':
      case 'mastercard':
      default:
        return '9999 - 9999 - 9999 - 9999'; // 4-4-4-4 format for Visa/Mastercard
    }
  };

  const handleMonthChange = (event) => {
    setClosingMonth(event.target.value);
    if (event.target.value == "February") {
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

    if (postalCode === "") {
      error = true;
      setError("Debes ingresar el código postal de la dirección de facturación");
    }
    if (street === "") {
      error = true;
      setError("Debes ingresar la calle y el número de la dirección de facturación");
    }

    if (city === "") {
      error = true;
      setError("Debes ingresar la ciudad de la dirección de facturación");
    }
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    var currentYear = today.getFullYear();
    if (validTrhuyear < currentYear) {
      error = true;
      setError("El año de vencimiento de la tarjeta no puede ser menor al año actual");
    }
    if (validTrhuyear == currentYear && validTrhuMonth < currentMonth) {
      error = true;
      setError("El mes de vencimiento de la tarjeta no puede ser menor al mes actual");
    }

    if (cardNumber === "") {
      error = true;
      setError("Debes ingresar el número de tarjeta");
    }

    if (cardHolderName === "") {
      error = true;
      setError("Debes ingresar el nombre del titular de la tarjeta");
    }
    var number = cardNumber.replaceAll("-", "").replaceAll(" ", "");

    setCardNumber(number);

    // Validate card number based on detected type
    const detectedType = detectCardType(number);
    if (!validateCardNumber(number, detectedType)) {
      error = true;
      setError(`El número de la tarjeta introducido es inválido para ${detectedType === 'amex' ? 'American Express' : detectedType === 'visa' ? 'Visa' : detectedType === 'mastercard' ? 'Mastercard' : 'el tipo de tarjeta detectado'}`);
    }

    if (error == false) {
      var db = getFirestore();

      var finalBin = number.substring(0, 6);
      var isAmex = number.substring(0, 2) == "34" || number.substring(0, 2) == "37";
      var shouldContinue = false;
      const docRef = doc(db, "Bins", finalBin);
      const docSnap = await getDoc(docRef);
      if (!isAmex) {
        shouldContinue = docSnap.exists();
      } else {
        shouldContinue = true;
      }


      setLoading(true);
      setLoading(false);
      if (shouldContinue) {
        var binData = docSnap.data();
   
        if (binData.brand === "VISA" || binData.brand === "MASTER CARD" || binData.brand === "AMERICAN EXPRESS") {
          setBank(binData.institution);
          if (binData.type.toLowerCase() !== "crédito") {
            setError("La tarjeta introducida es de débito, por favor verifica que la información sea correcta.");
          } else {

            let userId = localStorage.getItem('userId').trim();

            const userDocRef = doc(db, "Users", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              const userName = userData.name || "";

              // Split the user's name into components
              const userNameParts = userName.toLowerCase().split(' ');
              const cardHolderNameParts = cardHolderName.toLowerCase().split(' ');

              // Check if all parts of the user's name appear in the cardholder name
              const allPartsIncluded = userNameParts.every(part =>
                part.length > 0 && cardHolderNameParts.includes(part)
              );

              if (!allPartsIncluded) {
                error = true;
                setError("El nombre del titular de la tarjeta no coincide con el nombre registrado en tu cuenta");
                return;
              }

              // Continue with adding the card if validation passes
              var collectionRoute = "Users/" + userId + "/cards";
            } else {
              error = true;
              setError("No se pudo encontrar tu perfil de usuario. Error 202");
              return;
            }

            var collectionRoute = "Users/" + userId + "/cards";
            const q = collection(db, collectionRoute);
            try {
              getDocs(q).then((querySnapshot) => {

                querySnapshot.forEach((doc) => {
                  if (doc.data().cardNumber == number) {
                    error = true;
                  }
                });
                if (error) {
                  error = true;
                  setError("La tarjeta ya ha sido registrada en tu cuenta");
                } else {
                  var cardData = {
                    status: "ACTIVE",
                    bank: binData.institution,
                    cardNumber: number,
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
                    bin: binData
                  }
                  addDoc(collection(db, collectionRoute), cardData).then((docRef) => {
                    setError(null);
                    setInformation("La tarjeta ha sido verificada exitosamente");
                    setSuccess(true);

                    if (bankRef && bankRef.current) {
                      bankRef.current.value = binData.institution
                    }
                  })
                    .catch((error) => {
                      setLoading(false);
                      setError("Se produjo un error al obtener el perfil del usuario. Error 201")
                      console.error("Error writing document: ", error);
                    });
                }
              }).catch((error) => {
                setLoading(false);
                setError("Se produjo un error al obtener el perfil del usuario. Error 205")
                console.error("Error writing document: ", error);
              });
            } catch (error) {
              setLoading(false);
              console.error(error);
            }
          }
        } else {
          error = true;
          setError("La tarjeta introducida no es válida, el proceso sólo es compatible con Visa, Mastercard y American Express.");
        }
      } else {
        error = true;
        setError("Se produjo un error al verficar la numeración de la tarjeta. Por favor revisa que la información proporcionada sea correcta y que la tarjeta pertenezca a alguna insitutición bancaria que opere en la República Mexicana.");
      }



    } else {
     // console.log("Error en el formulario");
    }

  }

  const onSubmitClone = event => {
    setSuccess(true);
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
    try {
      closeRef.current.click();
      setLoading(false);
      setError(null);
      setSuccess(false);
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
      setCardType("");
      setCardMask("9999 - 9999 - 9999 - 9999");
      cardNumberRef.current.value = "";
      nameRef.current.value = "";
      monthRef.current.value = "";
      yearRef.current.value = "";
      closingMonthRef.current.value = "January";
      closingDayRef.current.value = 1;
      if (bankRef && bankRef.current) {
        bankRef.current.value = "";
      }
    } catch (error) {
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

  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    setCardNumber(value);

    // Detect card type and update mask
    const detectedType = detectCardType(value);
    const newMask = getCardMask(detectedType);

    if (detectedType !== cardType) {
      setCardType(detectedType);
    }

    if (newMask !== cardMask) {
      setCardMask(newMask);
    }
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
                    <h6>Agrega una tarjeta de crédito</h6>
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
                          <label htmlFor="cardHolder">Banco o institución financiera</label>
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
                          <label htmlFor="cardHolder">Nombre del titular</label>
                          <input
                            ref={nameRef}
                            type="text"
                            id="cardHolder"
                            placeholder="Nombre(s) Apllido(s)"
                            onChange={(event) => setCardHolderName(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="cardNumber">Número de tarjeta</label>
                          {/*   <input
                            type="text"
                            ref={cardNumberRef}
                            id="cardNumber"
                            placeholder="0000 - 0000 - 0000 - 0000"
                            onChange={(event) => setCardNumber(event.target.value)}
                          /> */}
                          <InputMask
                            id="cardNumber"

                            ref={cardNumberRef}

                            mask={cardMask}
                            onChange={handleCardNumberChange}
                          >
                            {(inputProps) => <input {...inputProps} type="text" placeholder={cardType === 'amex' ? "0000 - 000000 - 00000" : "0000 - 0000 - 0000 - 0000"} />}
                          </InputMask>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="month">Mes de vencimiento</label>
                          <select ref={monthRef} value={validTrhuMonth} onChange={handleValidThruMonth} className="w-100">
                            {months.map((itm) => (
                              <option value={itm} key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="year">Año de vencimiento</label>
                          <select ref={yearRef} value={validTrhuyear} onChange={handleValidThruYear} className="w-100">
                            {years.map((itm) => (
                              <option value={itm} key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>



                      {/*<div className="col-md-4">
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
                            </div>*/}
                      <div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="year">Día de corte (opcional)</label>
                          <select ref={closingDayRef} value={closingDay} onChange={handleClosingDay} className="w-100">
                            {closingDays.map((itm) => (
                              <option value={itm} key={itm}>{itm}</option>
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
                      <div className="col-md-8">
                        <div className="single-input">
                          <label htmlFor="postal">Dirección</label>
                          <input
                            ref={streetRef}
                            type="text" id="street" placeholder="Calle, #Ext, Colonia, Alcaldía o Municipio"
                            maxlength="500"
                            onChange={(event) => setStreet(event.target.value)} />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="postal">Ciudad o población</label>
                          <input
                            ref={cityRef}
                            type="text" id="city" placeholder="Ciudad o población"
                            onChange={(event) => setCity(event.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="single-input">
                          <label htmlFor="postal">Estado</label>
                          <select ref={stateRef} value={stateCity} onChange={handleStateChange} className="w-100">
                            {mexStatesAccented.map((itm) => (
                              <option value={itm} key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/*<div className="col-md-4">
                        <div className="single-input">
                          <label htmlFor="postal">País</label>
                          <select ref={countryRef} value={country} className="w-100">
                            {countrys.map((itm) => (
                              <option value={itm}  key={itm}>{itm}</option>
                            ))}
                          </select>
                        </div>
                            </div>*/}

                      <img className="openPayImage" src="/images/cards_accepted.png" alt="icon" />

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
