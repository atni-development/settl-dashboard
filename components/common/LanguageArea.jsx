import { SettlContext } from "@/context/context";
import Image from "next/image";
import { useContext } from "react";
import lang from "/public/images/icon/lang.png";

const LanguageArea = () => {
  const { languageActive, languageActiveHandler } = useContext(SettlContext);

  return (
    <div className="single-item language-area">
      <div className="language-btn">
        <Image src={lang} alt="icon" onClick={languageActiveHandler} />
      </div>
      <ul
        className={`main-area language-content ${languageActive && "active"}`}
      >
        <li>English</li>
        <li>Hindi</li>
        <li className="active">English (US)</li>
        <li>Japanese</li>
        <li>Kannada</li>
        <li>Lithuanian</li>
      </ul>
    </div>
  );
};

export default LanguageArea;
