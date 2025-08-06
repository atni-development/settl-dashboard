import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from 'react';

import Link from "next/link";
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, setDoc } from "firebase/firestore";
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
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const [information, setInformation] = useState(null);

  var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var validPasswordRegex =  /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
  const signupWithGoogle = event => {
    event.preventDefault();
    var auth = getAuth();
    auth.languageCode = 'es';
    console.log("Signing up with Google")
    signInWithPopup(auth, provider)
    .then(async(result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const authUser = result.user;
      console.log("User signed up with Google: "+authUser.uid)
      console.log(authUser)

      var db = getFirestore();
      
const docRef = doc(db, "Users", authUser.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data EXIST:", docSnap.data());
  if (docSnap.data() !== null) {
    console.log("User data is correct")
    var data = docSnap.data();
    localStorage.setItem('email', data.email);
    localStorage.setItem('phone', data.phone);
    localStorage.setItem('name', data.name);
    localStorage.setItem('profilePicture', data.profilePicture ?? "");

    localStorage.setItem('created_date', data.created_date.toDate().toLocaleDateString("es-MX"));
    localStorage.setItem('userId', authUser.uid);
    console.log("User data is: " + data.email + " " + data.phone + " " + data.name + " " + data.created_date + " " + authUser.uid)

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "OPR" or after "Version"
    if ((verOffset = nAgt.indexOf("OPR")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 4);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MS Edge, the true version is after "Edg" in userAgent
    else if ((verOffset = nAgt.indexOf("Edg")) != -1) {
      browserName = "Microsoft Edge";
      fullVersion = nAgt.substring(verOffset + 4);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
    var paymentData = {
      browserName: browserName,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      OSName: OSName,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      version: fullVersion,
      created_date: serverTimestamp()
    };

    const q = collection(db, "Users/" + authUser.uid + "/sessions");
    addDoc(q, paymentData).then((docRef) => {
      router.push("/");
    }).catch((error) => { });



  } else {
    setError("Se produjo un error al obtener el perfil del usuario. Error 201")
    console.error("Error reading document: ", error);
  }
} else {
  
  var dataToInsert = {
    name: authUser.displayName,
  email: authUser.email,
  phone: authUser.phoneNumber ?? "",
  profilePicture: authUser.photoURL,
  provider: "gmail",
  created_date: serverTimestamp(),
  sendAnnouncements: true,
  sendPaymentNotifications: true,
  sendMadeRequestNotifications: true,
  sendPaymentProblemsNotifications: true,
  sendPromosNotifications: true,
  sendAccountUpdateNotifications: true,
};
console.log(dataToInsert);

      setDoc(doc(db, "Users", authUser.uid), dataToInsert).then(() => {
        localStorage.setItem('email',authUser.email);
        localStorage.setItem('phone',authUser.phoneNumber ?? "");
        localStorage.setItem('name',authUser.displayName);
        localStorage.setItem('profilePicture', authUser.profilePicture ?? "");

        localStorage.setItem('userId', authUser.uid);
        localStorage.setItem('created_date', new Date().toLocaleDateString("es-MX"));
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = ''+parseFloat(navigator.appVersion); 
        var majorVersion = parseInt(navigator.appVersion,10);
        var nameOffset,verOffset,ix;
        
        // In Opera, the true version is after "OPR" or after "Version"
        if ((verOffset=nAgt.indexOf("OPR"))!=-1) {
         browserName = "Opera";
         fullVersion = nAgt.substring(verOffset+4);
         if ((verOffset=nAgt.indexOf("Version"))!=-1) 
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In MS Edge, the true version is after "Edg" in userAgent
        else if ((verOffset=nAgt.indexOf("Edg"))!=-1) {
         browserName = "Microsoft Edge";
         fullVersion = nAgt.substring(verOffset+4);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
         browserName = "Microsoft Internet Explorer";
         fullVersion = nAgt.substring(verOffset+5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
         browserName = "Chrome";
         fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
         browserName = "Safari";
         fullVersion = nAgt.substring(verOffset+7);
         if ((verOffset=nAgt.indexOf("Version"))!=-1) 
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
         browserName = "Firefox";
         fullVersion = nAgt.substring(verOffset+8);
        }
        // In most other browsers, "name/version" is at the end of userAgent 
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                  (verOffset=nAgt.lastIndexOf('/')) ) 
        {
         browserName = nAgt.substring(nameOffset,verOffset);
         fullVersion = nAgt.substring(verOffset+1);
         if (browserName.toLowerCase()==browserName.toUpperCase()) {
          browserName = navigator.appName;
         }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(";"))!=-1)
           fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
           fullVersion=fullVersion.substring(0,ix);
        
        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
         fullVersion  = ''+parseFloat(navigator.appVersion); 
         majorVersion = parseInt(navigator.appVersion,10);
        }
        var OSName="Unknown OS";
        if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
        if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
        if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
        if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
        var paymentData = {
          browserName: browserName,
          appName: navigator.appName,
          appVersion: navigator.appVersion,
          OSName: OSName,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          version: fullVersion,
          created_date: serverTimestamp()
        };
        
        const q = collection(db, "Users/"+authUser.uid+"/sessions");
        addDoc(q, paymentData).then((docRef) => {
        
          router.push("deposit-money/step-1");
        }).catch((error) => {});

      }).catch((error) => {
        setError("Se produjo un error al crear el usuario. Error 202")
        console.error("Error writing document: ", error);
      });
    }
 
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: "+errorCode+" "+errorMessage)
  
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
    
  };
  

  const onForgetPassword = event => {
    event.preventDefault();
    setError(null)
    var currentError = null;

    if (email === "") {
      currentError = "El correo electrónico es necesario para recuperar la contraseña"
    } else {
      if (!validEmailRegex.test(email)) {
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
          //console.log(error)
          setError(error.message + " Código: " + error.code)

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
      /*var test = "^[A-Za-z0-9]+$".test(passwordOne);
      console.log("Test: " + passwordOne.match("^[A-Za-z0-9]+$"));
      console.log("Password)ne: " + passwordOne)
      if (!passwordOne.match("^[A-Za-z0-9]+$") || passwordOne.length < 6) {
        currentError = "La contraseña debe tener al menos 6 caracteres con un número y una letra."
      }else{

      }*/
     var str = passwordOne;
      if (str.length < 6) {
        currentError = "la contraseña debe contener al menos 6 caracteres.";
    } else if (str.length > 25) {
      currentError = "la contraseña debe contener menos de 25 caracteres.";
    } else if (str.search(/\d/) == -1) {
      currentError = "la contraseña debe contener al menos un número.";

    } else if (str.search(/[a-zA-Z]/) == -1) {
      currentError = "la contraseña debe contener al menos una letra.";

    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
      currentError = "la contraseña contiene un caractér inválido.";
    }
    }

    if (email === "") {
      currentError = "El correo electrónico es requerido"
    } else {
      if (!validEmailRegex.test(email)) {
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
              localStorage.setItem('created_date', data.created_date.toDate().toLocaleDateString("es-MX"));
              localStorage.setItem('userId', authUser.user.uid);
              console.log("User data is: " + data.email + " " + data.phone + " " + data.name + " " + data.created_date + " " + authUser.user.uid)

              var nVer = navigator.appVersion;
              var nAgt = navigator.userAgent;
              var browserName = navigator.appName;
              var fullVersion = '' + parseFloat(navigator.appVersion);
              var majorVersion = parseInt(navigator.appVersion, 10);
              var nameOffset, verOffset, ix;

              // In Opera, the true version is after "OPR" or after "Version"
              if ((verOffset = nAgt.indexOf("OPR")) != -1) {
                browserName = "Opera";
                fullVersion = nAgt.substring(verOffset + 4);
                if ((verOffset = nAgt.indexOf("Version")) != -1)
                  fullVersion = nAgt.substring(verOffset + 8);
              }
              // In MS Edge, the true version is after "Edg" in userAgent
              else if ((verOffset = nAgt.indexOf("Edg")) != -1) {
                browserName = "Microsoft Edge";
                fullVersion = nAgt.substring(verOffset + 4);
              }
              // In MSIE, the true version is after "MSIE" in userAgent
              else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
                browserName = "Microsoft Internet Explorer";
                fullVersion = nAgt.substring(verOffset + 5);
              }
              // In Chrome, the true version is after "Chrome" 
              else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browserName = "Chrome";
                fullVersion = nAgt.substring(verOffset + 7);
              }
              // In Safari, the true version is after "Safari" or after "Version" 
              else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browserName = "Safari";
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1)
                  fullVersion = nAgt.substring(verOffset + 8);
              }
              // In Firefox, the true version is after "Firefox" 
              else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browserName = "Firefox";
                fullVersion = nAgt.substring(verOffset + 8);
              }
              // In most other browsers, "name/version" is at the end of userAgent 
              else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
                (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);
                if (browserName.toLowerCase() == browserName.toUpperCase()) {
                  browserName = navigator.appName;
                }
              }
              // trim the fullVersion string at semicolon/space if present
              if ((ix = fullVersion.indexOf(";")) != -1)
                fullVersion = fullVersion.substring(0, ix);
              if ((ix = fullVersion.indexOf(" ")) != -1)
                fullVersion = fullVersion.substring(0, ix);

              majorVersion = parseInt('' + fullVersion, 10);
              if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
              }
              var OSName = "Unknown OS";
              if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
              if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
              if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
              if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
              var paymentData = {
                browserName: browserName,
                appName: navigator.appName,
                appVersion: navigator.appVersion,
                OSName: OSName,
                platform: navigator.platform,
                userAgent: navigator.userAgent,
                version: fullVersion,
                created_date: serverTimestamp()
              };

              const q = collection(db, "Users/" + authUser.user.uid + "/sessions");
              addDoc(q, paymentData).then((docRef) => {
                router.push("/");
              }).catch((error) => { });



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
          //console.log(error)
          if (error.code == "auth/invalid-credential") {
            setError("El correo electrónico o la contraseña son incorrectos")
          } else {
            if (error.code == "auth/user-disabled") {
              setError("Por seguridad se bloqueó tu cuenta, contacta al administrador de la plataforma")

            } else {
              setError(error.message + " Código: " + error.code)

            }
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
                <h2 className="title">Inicia sesión para continuar</h2>
                <p className="dont-acc">
                  ¿No tienes una cuenta? <Link className="green_link" href="/sign-up">Regístrate</Link>
                </p>
                <div className="reg-google">
                <Link  href ="" onClick={signupWithGoogle}>
                    <FaGoogle />
                    Inicia sesión con Google
                  </Link>
                </div>
                <span className="or">o continúa con</span>
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
                          <Button>Inicia sesión</Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Container>

              <div className="forgot-pass text-center">
                <Link href="" onClick={onForgetPassword}>Olvidé mi contraseña</Link>
              </div>
            </div>
          </div>
          <span className="version-code">7</span>

        </div>

      </div>

    </section>
  );
};

export default LoginBody;
