import LoginBody from "@/components/login/LoginBody";
import SiteNavBar from "@/components/navBar/SiteNavBar";
//import NavBar from "@/components/navBar/NavBar";

export default function Login() {
  return (
    <>
      {/* Nav bar section    <NavBar />*/}
   

      {/* Login Body  Section */}
      <SiteNavBar />
      <LoginBody />
    </>
  );
}

Login.getLayout = function getLayout(page) {
  return <>{page}</>;
};
