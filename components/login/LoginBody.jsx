import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { FaGoogle } from "react-icons/fa";
import LoginForm from "./LoginForm";
import login_reg_bg from "/public/images/login-reg-bg.png";
import firebase_app from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

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
          console.log("Success. The user is created in Firebase "+authUser.user.uid)
          var db = getFirestore();
          const docRef = doc(db, "Users", authUser.user.uid);
          getDoc(docRef).then((doc) => {
            if(doc.data() != null){
              var data = doc.data();
              localStorage.setItem('email',data.email);
              localStorage.setItem('phone',data.phone);
              localStorage.setItem('name',data.name);
              localStorage.setItem('userId', authUser.user.uid);
              router.push("/");
            }else{
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
          if(error.code == "auth/invalid-credential"){
            setError("El correo electrónico o la contraseña son incorrectos")
          }else{
            setError(error.message+" Código: "+error.code)
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
              <Lottie animationData={groovyWalkAnimation}/>
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
