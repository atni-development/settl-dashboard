import Image from "next/image";
import confirm from "/public/images/icon/confirm.png";
import not_confirm from "/public/images/icon/not-confirm.png";
import pending from "/public/images/icon/pending.png";
import owner_profile_2 from "/public/images/owner-profile-2.png";
import { storage } from "@/firebase/config";
import { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { doc, setDoc, serverTimestamp, getFirestore, collection, addDoc, getDoc, updateDoc } from "firebase/firestore"; 
import InputMask from 'react-input-mask';

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";

const AccountTab = () => {
  
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [email, setEmail] = useState("");
  const [created_date, setCreated_date] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);

  const showToast = () => {
    toast.error("Se produjo un error al subir la imagen");
  };

  const updateInfo = (event) => {
    event.preventDefault();

    if(name === "") {
      toast.error("El nombre completo es necesario");
      return;
    }
    var db = getFirestore();
    var dataToInsert = {
      name: name,
    };
    if(address !== "" && address !== null && address !== undefined) {
      dataToInsert.address = address;
    }
    if(phone !== "" && phone !== null && phone !== undefined) {
      dataToInsert.phone = phone;
    }
    updateDoc(doc(db, "Users", userId), dataToInsert).then(() => {
      toast.success("Información actualizada");
      localStorage.setItem('name', name);
      localStorage.setItem('phone', phone);
      localStorage.setItem('address', address);
    }).catch((error) => {
      toast.error("Se produjo un error al actualizar la información");
      console.error("Error adding document: ", error);
    });

  };

  const uploadFile = (file) => {
    if (file === null) {
      toast.error("Debes seleccionar una imagen");

     // toastifyError("Selecciona una imagen");
      console.log("No image selected");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // Check if file size is greater than 2MB
      toast.error("El archivo debe ser menor a 2MB");
      return;
    }
    const imageRef = storageRef(storage, `users/${userId}`);
    console.log("uploading...");
    var db = getFirestore();

    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            var dataToInsert = {
              profilePicture: url,
            };
            updateDoc(doc(db, "Users", userId), dataToInsert).then(() => {
            console.log("File available at", url);
            setProfilePicture(url);
            localStorage.setItem('profilePicture', url);
            window.location.reload();

            }).catch((error) => {
              toast.error("Se produjo un error al subir la imagen");
              console.error("Error adding document: ", error);
            });
          })
          .catch((error) => {
            //toastifyError(error.message);
            console.log(error.message);
            toast.error("Se produjo un error al subir la imagen");

          });
      })
      .catch((error) => {
        toast.error("Se produjo un error al subir la imagen");
        console.log(error.message);

        // toastifyError(error.message);
      });
  };

  const onLogOut = event => {
    console.log("logout");
    const auth = getAuth();
    signOut(auth).then(() => {
      
      var userId = localStorage.getItem('userId').trim();
      localStorage.setItem('email',null);
      localStorage.setItem('phone',null);
      localStorage.setItem('name',null);
      localStorage.setItem('userId', null);
      localStorage.setItem('profilePicture', null);
      localStorage.setItem('created_date', null);
      localStorage.removeItem(userId+'session_date');
      localStorage.removeItem(userId+'current_card');
      localStorage.removeItem(userId+'amountToPay');
      localStorage.removeItem(userId+'commisionToPay');
      
      



      router.push("/login");
      
    }).catch((error) => {
      console.log(error);
      //router.push("/login");
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let name = localStorage.getItem('name');
      let userId = localStorage.getItem('userId');
      let phone = localStorage.getItem('userphoneId');
      let email = localStorage.getItem('email');
      let created_date = localStorage.getItem('created_date');
      let profilePicture = localStorage.getItem('profilePicture');

      setPhone(phone);
      setUserId(userId);
      setEmail(email);
      setName(name);
      setProfilePicture(profilePicture);

      setCreated_date(created_date);

      getDoc(doc(getFirestore(), "Users", userId)).then((doc) => {
        if(doc.exists()) {
          setAddress(doc.data().address);
          setPhone(doc.data().phone);
          console.log("Document data:", doc.data());
          console.log("Document data:", doc.data().address);
          console.log("Document data:", doc.data().phone);
        }

      }).catch((error) => {});
    }
  }, []);

  return (
    <div
      className="tab-pane fade show active"
      id="account"
      role="tabpanel"
      aria-labelledby="account-tab"
    >

      <div className="upload-avatar">
        <div className="avatar-left d-flex align-items-center">
          <div className="profile-img">
          <Image src={imageUpload?imageUpload:profilePicture?profilePicture:owner_profile_2} alt="User" width="60" height="60"   style={{width: "auto", height: 60, borderRadius: 60/ 2, border: "2px solid rgba(0, 0, 0, 0.05)"}}  />
 
          </div>
          <div className="instraction">
            <h6>Tu Avatar</h6>
            <p>La imagen debe ser de máximo: 2MB</p>
          </div>
        </div>
        <div className="avatar-right">
          <div className="file-upload">
            <div className="right-area">
              <label className="file">
                <input type="file" accept="image/png,image/jpeg" onChange={(e) => {uploadFile(e.target.files[0])}} />
                <span className="file-custom"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <form action="#">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="fName1">Nombre</label>
              <input type="text" id="fName1" placeholder={name} value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="email1">Correo electrónico</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-12">
                  <input
                    disabled
                    type="text"
                    id="email1"
                    value={email}
                    placeholder={email}
                  />
                </div>
           
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="phone1">Teléfono</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-12">
                <InputMask
                    mask="(99) 9999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  >
                    {(inputProps) => <input {...inputProps} type="text" id="phone1" placeholder="(55) 123-4567" />}
                  </InputMask>
                </div>
           
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle #124, Colonia, Ciudad, Estado, C.P. 12345"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="btn-border">
              <button className="cmn-btn" onClick={updateInfo}>Guardar</button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />

    </div>
  );
};

export default AccountTab;
