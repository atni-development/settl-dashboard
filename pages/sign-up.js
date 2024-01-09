import SiteNavBar from "@/components/navBar/SiteNavBar";
import SignUpBody from "@/components/signUp/SignUpBody";

export default function SignUp() {
  return (
    <>
      {/* Nav bar section */}
      <SiteNavBar />

      {/* SignUp Body section */}
      <SignUpBody />
    </>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <>{page}</>;
};
