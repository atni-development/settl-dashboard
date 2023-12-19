import Image from "next/image";
import Link from "next/link";
import delete_2 from "/public/images/icon/delete-2.png";
import logout from "/public/images/icon/logout.png";
import owner_profile from "/public/images/owner-profile.png";

const OwnerDetails = () => {
  return (
    <div className="owner-details">
      <div className="profile-area">
        <div className="profile-img">
          <Image src={owner_profile} alt="image" />
        </div>
        <div className="name-area">
          <h6>María Pérez García</h6>
          <p className="active-status">Activo</p>
        </div>
      </div>
      <div className="owner-info">
        <ul>
          <li>
            <p>ID:</p>
            <span className="mdr">Rex49484</span>
          </li>
          <li>
            <p>Registrado el:</p>
            <span className="mdr">Feb 25,2023</span>
          </li>
          <li>
            <p>Identidad:</p>
            <span className="mdr">Confirmada</span>
          </li>
        </ul>
      </div>
      <div className="owner-action">
        <Link href="#">
          <Image src={logout} alt="image" />
          Cerrar sesión
        </Link>
        <Link href="#" className="delete">
          <Image src={delete_2} alt="image" />
          Borrar cuenta
        </Link>
      </div>
    </div>
  );
};

export default OwnerDetails;
