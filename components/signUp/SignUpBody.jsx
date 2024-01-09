import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

import { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { FaGoogle } from "react-icons/fa";
import SignUpForm from "./SignUpForm";
import login_reg_bg from "/public/images/login-reg-bg.png";
import firebase_app from "@/firebase/config";

const SignUpBody = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var validPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  const onSubmit = event => {
    event.preventDefault();
    setError(null)
    var currentError = null;
    if (passwordTwo === "") {
      currentError = "La confirmación de contraseña es requerida"
    }
    if (passwordOne === "") {
      currentError = "La contraseña es requerida"
    } else {
      if (!passwordOne.match(validPasswordRegex)) {
        currentError = "La contraseña debe tener al menos 6 caracteres, un número y un caracter especial"
      }
    }
    if (passwordOne !== passwordTwo) {
      currentError = "Las contraseñas no coinciden"
    }

    if (phone === "") {
      currentError = "El teléfono es requerido"
    } else {
      if (!isNumeric(phone)) {
        currentError = "El teléfono debe contener solo números"
      }
      if (phone.length != 10) {
        currentError = "El teléfono debe tener 10 dígitos"
      }
    }

    if (email === "") {
      currentError = "El correo electrónico es requerido"
    } else {
      if (!email.match(validEmailRegex)) {
        currentError = "El correo electrónico es inválido"
      }
    }

    if (name === "") {
      currentError = "El nombre es requerido"
    } else {
      if (name.length < 4) {
        currentError = "El nombre debe tener al menos 4 caracteres"
      }
      if (!name.includes(" ")) {
        currentError = "El nombre debe contener el nombre y el apellido"
      }
    }



    if (currentError != null) {
      setError(currentError)
      event.preventDefault();
    } else {
      console.log("Registering user in Firebase")
      var auth = getAuth();
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then(authUser => {
          console.log("Success. The user is created in Firebase "+authUser.user.uid)
          var db = getFirestore();
          setDoc(doc(db, "Users", authUser.user.uid), {
            name: name,
            email: email,
            phone: phone,
            provider: "password",
          }).then(() => {
            localStorage.setItem('email',email);
            localStorage.setItem('phone',phone);
            localStorage.setItem('name',name);
            localStorage.setItem('userId', authUser.user.uid);
            router.push("deposit-money/step-1");
          }).catch((error) => {
            setError("Se produjo un error al crear el usuario. Error 202")
            console.error("Error writing document: ", error);
          });
        })
        .catch(error => {
          setError(error.message)
        });
    }
  };

  return (
    <section className="login-reg">
      <div className="overlay pt-120">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-6 order-xl-0 order-1">
              <div className="sec-img d-rtl">
                <Image src={login_reg_bg} className="max-un" alt="image" />
              </div>
            </div>
            <div className="col-xl-5">
              <div className="section-text text-center">
                <h5 className="sub-title">Cuenta</h5>
                <h2 className="title">Bienvenido a Settl</h2>
                <p className="dont-acc">
                  ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
                </p>
                <div className="reg-google">
                  <Link href="#">
                    <FaGoogle />
                    Inicia sesión con Google
                  </Link>
                </div>
                <span className="or">o continua con</span>
              </div>
              <Container className="text-center custom-container">
                <Row>
                  <Col>
                    <Form
                      className="custom-form"
                      onSubmit={onSubmit}>
                      {error && <Alert color="danger">{error}</Alert>}
                      <FormGroup row>
                        <Label for="signUpName" sm={4}>Nombre compeleto</Label>
                        <Col sm={8}>
                          <Input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            name="name"
                            id="signUpName"
                            placeholder="Nombre completo" />
                        </Col>
                      </FormGroup>
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
                        <Label for="signUpCellphone" sm={4}>Celular</Label>
                        <Col sm={8}>
                          <Input
                            type="number"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            name="phone"
                            id="signUpCellphone"
                            placeholder="Teléfono (10 dígitos)" />
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
                        <Label for="signUpPassword2" sm={4}>Confirma tu contraseña</Label>
                        <Col sm={8}>
                          <Input
                            type="password"
                            name="password"
                            value={passwordTwo}
                            onChange={(event) => setPasswordTwo(event.target.value)}
                            id="signUpPassword2"
                            placeholder="Confirma tu contraseña" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpBody;
