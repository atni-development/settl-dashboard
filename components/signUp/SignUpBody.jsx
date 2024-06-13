import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getFirestore, collection, addDoc, getDoc } from "firebase/firestore"; 


import { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { FaGoogle } from "react-icons/fa";
import SignUpForm from "./SignUpForm";
import login_reg_bg from "/public/images/login-reg-bg.png";
import firebase_app from "@/firebase/config";

import Lottie from "lottie-react";
import groovyWalkAnimation from "loading.json";

const SignUpBody = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //var validPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
 // var validPasswordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*¡!¿_-])[a-zA-Z0-9!@#$%^&*¡!¿_-]{5,20}$/
 var validEmailRegex = /^(?=.*[a-zA-Z])(?=(?:.*\d){5})[a-zA-Z0-9]*$/;



  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

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
        localStorage.setItem('userId', authUser.uid);
        localStorage.setItem('profilePicture', authUser.profilePicture ?? "");

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
      if (!validPasswordRegex.test(passwordOne)) {
        currentError = "La contraseña debe tener al menos 6 caracteres, un número"
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

    if(name.split(" ").length<2){
      currentError = "El nombre debe contener nombre y apellido"
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
      auth.languageCode = 'es';

      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then(authUser => {
          console.log("Success. The user is created in Firebase "+authUser.user.uid)
          var db = getFirestore();

          
          setDoc(doc(db, "Users", authUser.user.uid), {
            name: name,
            email: email,
            phone: phone,
            provider: "password",
            created_date: serverTimestamp(),
            sendAnnouncements: true,
            sendPaymentNotifications: true,
            sendMadeRequestNotifications: true,
            sendPaymentProblemsNotifications: true,
            sendPromosNotifications: true,
            sendAccountUpdateNotifications: true,
          }).then(() => {
            localStorage.setItem('email',email);
            localStorage.setItem('phone',phone);
            localStorage.setItem('name',name);
            localStorage.setItem('userId', authUser.user.uid);
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
            
            const q = collection(db, "Users/"+authUser.user.uid+"/sessions");
            addDoc(q, paymentData).then((docRef) => {
            
              router.push("deposit-money/step-1");
            }).catch((error) => {});

          }).catch((error) => {
            setError("Se produjo un error al crear el usuario. Error 202")
            console.error("Error writing document: ", error);
          });
        })
        .catch(error => {
          if (error.code == "auth/email-already-in-use") {
            setError("Ya existe una cuenta en uso con el correo electrónico")
          } else {
            if (error.code == "auth/user-disabled"){
              setError("Por seguridad se bloqueó tu cuenta, contacta al administrador de la plataforma")

            }else{
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
          <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 order-xl-0 order-1">
               <div className="sec-img d-rtl">
                 <Lottie animationData={groovyWalkAnimation} /> 
              </div> 
            </div>
            <div className="col-xl-5">
              <div className="section-text text-center">
                <br></br>     <br></br>     <br></br>     <br></br>
                <h5 className="sub-title">Regístrate</h5>
                <h2 className="title">Bienvenido a Settl</h2>
                <p className="dont-acc">
                  ¿Ya tienes una cuenta? <Link className="green_link"  href="/login">Inicia sesión</Link>
                </p>
                <div className="reg-google">
                  <Link  href ="" onClick={signupWithGoogle}>
                    <FaGoogle />
                    Regístrate con Google
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
                        <Label className="align-left" for="signUpName" sm={4}>Nombre completo</Label>
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
                        <Label className="align-left" for="signUpEmail" sm={4}>Correo Electrónico</Label>
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
                        <Label  className="align-left" for="signUpCellphone" sm={4}>Celular</Label>
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
                        <Label className="align-left" for="signUpPassword" sm={4}>Contraseña</Label>
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
                        <Label className="align-left" for="signUpPassword2" sm={4}>Confirma tu contraseña</Label>
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
