import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

const { createContext, useState, useEffect } = require("react");

const SettlContext = createContext();

const SettlProvider = ({ children }) => {
  const [activeLefMenu, setActiveLefMenu] = useState(true);
  const [userActive, setUserActive] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);
  const [languageActive, setLanguageActive] = useState(false);
  const [getPath, setGetPath] = useState("/");

  const router = useRouter();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1399px)",
  });

  const userActiveHandler = () => {
    setNotificationActive(false);
    setLanguageActive(false);
    setUserActive(!userActive);
  };

  const notificationActiveHandler = () => {
    setLanguageActive(false);
    setUserActive(false);
    setNotificationActive(!notificationActive);
  };

  /*const languageActiveHandler = () => {
    setNotificationActive(false);
    setUserActive(false);
    setLanguageActive(!languageActive);
  };*/

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setActiveLefMenu(false);
    } else {
      setActiveLefMenu(true);
    }
  }, [isDesktopOrLaptop]);

  useEffect(() => {
    if (router.pathname === "/") {
      setGetPath("/");
    } else {
      setGetPath(router.pathname.split("/")[1]);
    }
  }, [router.pathname]);
  return (
    <SettlContext.Provider
      value={{
        activeLefMenu,
        setActiveLefMenu,
        userActiveHandler,
        notificationActiveHandler,
        userActive,
        notificationActive,
        languageActive,
        getPath,
      }}
    >
      {children}
    </SettlContext.Provider>
  );
};

export { SettlContext, SettlProvider };
