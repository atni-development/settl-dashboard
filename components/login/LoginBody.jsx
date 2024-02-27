import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from 'react';

import Link from "next/link";
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Script from 'next/script';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { FaGoogle } from "react-icons/fa";
import LoginForm from "./LoginForm";
import login_reg_bg from "/public/images/login-reg-bg.png";
import firebase_app from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import axios from 'axios';

import Lottie from "lottie-react";
import groovyWalkAnimation from "loading.json";

const LoginBody = () => {

  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const [information, setInformation] = useState(null);

  var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var validPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


  const onForgetPassword = event => {
    event.preventDefault();
    setError(null)
    var currentError = null;

    if (email === "") {
      currentError = "El correo electrónico es necesario para recuperar la contraseña"
    } else {
      if (!email.match(validEmailRegex)) {
        currentError = "El correo electrónico es inválido"
      }
    }

    if (currentError != null) {
      setError(currentError)
      event.preventDefault();
    } else {
    
      var auth = getAuth();
      auth.languageCode = 'es';
      sendPasswordResetEmail(auth, email)
        .then(() => {
            setInformation("Se ha enviado un correo electrónico para restablecer la contraseña")
        })
        .catch(error => {
          console.log(error)
          setError(error.message+" Código: "+error.code)

        });
    }
  };

  /*const onForgetPassword = event => {
    //e.preventDefault();
    var body = {
      "card_number": "5555555555554444",
      "holder_name": "Juan Perez Ramirez",
      "expiration_year": "27",
      "expiration_month": "12",
      "cvv2": "110",
      "address": {
        "city": "Querétaro",
        "country_code": "MX",
        "postal_code": "76900",
        "line1": "Av 5 de Febrero",
        "line2": "Roble 207",
        "line3": "col carrillo",
        "state": "Queretaro"
      }
    };
    const encodedToken = Buffer.from("sk_86e55dd39d8249e79fc3661f2d520756:").toString('base64');
    const headers = {
      'Authorization': 'Basic ' + encodedToken
    }
    console.log(headers)
    console.log(JSON.stringify(body))
    var request = axios.post('https://sandbox-api.openpay.mx/v1/mdjfxaujamxkjpeernxz/tokens', body, {
      headers
    }).then((response) => {
      console.log("FIRST RESPONSE successful");
      console.log(response);
      OpenPay.setId('mdjfxaujamxkjpeernxz');
      OpenPay.setApiKey('pk_db2479b316df4f4db0c85a09c3b833c5');
      OpenPay.setSandboxMode(true);
      var deviceDataId = OpenPay.deviceData.setup("formId");
      console.log("WAITING 5 SECONDS")
      setTimeout('', 500);
      console.log("5 SECONDS DONE")

      var chargeBody = {
        "method": "card",
        "amount": 6000.00,
        "description": " Cargo 3D Secure ",
        "order_id": "000000014",
        "source_id": response.data.id,
        "redirect_url": "http://localhost:3000/login",
        "use_3d_secure": "false",
        device_session_id: deviceDataId,
        "customer" : {
          "name" : "Juan",
          "last_name" : "Perez Ramirez",
          "phone_number" : "4423456723",
          "email" : "juan.vazquez@empresa.com.mx"
     }
        
      };
      var chargeRequest = axios.post('https://sandbox-api.openpay.mx/v1/mdjfxaujamxkjpeernxz/charges', chargeBody, {
        headers
      }).then((response) => {
        console.log("response CHARGE successful");
        console.log(response);
        var data = response.data;
      
          //Transaction can not be partially refunded today, try tomorrow
          console.log("WAITING 6 SECONDS")
    
          var devolucionBody = {
            "description" : "devolución",
            "amount" : 100.00
         };
          var devRequest = axios.post('https://sandbox-api.openpay.mx/v1/mdjfxaujamxkjpeernxz/charges/'+data.id+'/refund', devolucionBody, {
            headers
          }).then((response) => {
            console.log("response DEV successful");
            console.log(response);
          }).catch((error) => {
            console.log("Error happen devolviendo");
            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
          });
      
      }).catch((error) => {
        console.log("Error CHARGE happen");
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
      });


    }).catch((error) => {
      console.log("Error happen");
      console.log(error);
      console.log(error.response);
      console.log(error.response.data);
    });
    console.log(request)
  };*/

  const onSubmit = event => {
    event.preventDefault();
    setError(null)
    var currentError = null;

    if (passwordOne === "") {
      currentError = "La contraseña es requerida"
    } else {
      if (!passwordOne.match(validPasswordRegex)) {
        currentError = "La contraseña debe tener al menos 6 caracteres, un número y un caracter especial"
      }
    }

    if (email === "") {
      currentError = "El correo electrónico es requerido"
    } else {
      if (!email.match(validEmailRegex)) {
        currentError = "El correo electrónico es inválido"
      }
    }

    if (currentError != null) {
      setError(currentError)
      event.preventDefault();
    } else {
      console.log("Logging user in Firebase")
      var auth = getAuth();
      auth.languageCode = 'es';
      signInWithEmailAndPassword(auth, email, passwordOne)
        .then(authUser => {
          console.log("Success. The user is created in Firebase " + authUser.user.uid)
          var db = getFirestore();
          const docRef = doc(db, "Users", authUser.user.uid);
          getDoc(docRef).then((doc) => {
            if (doc.data() != null) {
              var data = doc.data();
              localStorage.setItem('email', data.email);
              localStorage.setItem('phone', data.phone);
              localStorage.setItem('name', data.name);
              localStorage.setItem('userId', authUser.user.uid);
              router.push("/");
            } else {
              setError("Se produjo un error al obtener el perfil del usuario. Error 201")
              console.error("Error writing document: ", error);
            }
          }).catch((error) => {
            setError("Se produjo un error al obtener el perfil del usuario. Error 201")
            console.error("Error writing document: ", error);
          });
        })
        .catch(error => {
          console.log("Error logging in user in Firebase")
          console.log(error)
          if (error.code == "auth/invalid-credential") {
            setError("El correo electrónico o la contraseña son incorrectos")
          } else {
            setError(error.message + " Código: " + error.code)
          }
        });
    }
  };

  return (

    <section className="login-reg">
    
      <div className="overlay pt-120">
        <div className="container">
          <br></br>          <br></br>
          <br></br>          <br></br>

          <div className="row align-items-center justify-content-center">
            <div className="col-xl-6 order-xl-0 order-1">
              <div className="sec-img d-rtl">
                <Lottie animationData={groovyWalkAnimation} />
              </div>
            </div>
            <div className="col-xl-5">
              <div className="section-text text-center">
                <h5 className="sub-title">Inicio de sesión</h5>
                <h2 className="title">Inicia sesion para continuar</h2>
                <p className="dont-acc">
                  ¿No tienes una cuenta? <Link href="/sign-up">Regístrate</Link>
                </p>
                <div className="reg-google">
                  <Link href="#">
                    <FaGoogle />
                    Regístrate con Google
                  </Link>
                </div>
                <span className="or">o conitnua con</span>
              </div>

              <Container className="text-center custom-container">
                <Row>
                  <Col>
                    <Form
                      className="custom-form"
                      onSubmit={onSubmit}>
                      {error && <Alert color="danger">{error}</Alert>}
                      {information && <Alert color="success">{information}</Alert>}

                      <FormGroup row>
                        <Label for="signUpEmail" sm={4}>Correo Electrónico</Label>
                        <Col sm={8}>
                          <Input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            name="email"
                            id="signUpEmail"
                            placeholder="Email" />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="signUpPassword" sm={4}>Contraseña</Label>
                        <Col sm={8}>
                          <Input
                            type="password"
                            name="passwordOne"
                            value={passwordOne}
                            onChange={(event) => setPasswordOne(event.target.value)}
                            id="signUpPassword"
                            placeholder="Contraseña" />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col>
                          <Button>Regístrate</Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Container>

              <div className="forgot-pass mt-30 text-center">
                <Link href="" onClick={onForgetPassword}>Olvidé mi contraseña</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginBody;
