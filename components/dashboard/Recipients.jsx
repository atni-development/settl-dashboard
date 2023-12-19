import Image from "next/image";
import Link from "next/link";
import right_arrow from "/public/images/icon/right-arrow.png";
import recipients_1 from "/public/images/recipients-1.png";
import recipients_2 from "/public/images/recipients-2.png";
import recipients_3 from "/public/images/recipients-3.png";
import recipients_4 from "/public/images/recipients-4.png";

const Recipients = () => {
  return (
    <div className="single-item">
      <div className="section-text d-flex align-items-center justify-content-between">
        <h6>Tarjetahabiente</h6>
       {/* <div className="view-all d-flex align-items-center">
          <Link href="#">View All</Link>
          <Image src={right_arrow} alt="icon" />
        </div> */}
      </div>
      <ul className="recipients-item">
        <li>
          <p className="left d-flex align-items-center">
            <Image src={recipients_1} alt="icon" />
            <span className="info">
              <span>Ivan Casillas</span>
              <span>Tarjeta habiente principal</span>
            </span>
          </p>
          <p className="right">
            <span> +$60,000</span>
            <span>Pagado</span>
          </p>
        </li>
    
        
      </ul>
    </div>
  );
};

export default Recipients;
