import AddCardModal from "./modal/AddCardModal";
import AddRecipientsModal from "./modal/AddRecipientsModal";
import CardModal from "./modal/CardModal";
import CongratulationsModal from "./modal/CongratulationsModal";
import PurchasedModal from "./modal/PurchasedModal";
import RecipientsModal from "./modal/RecipientsModal";
import TransactionModal from "./modal/TransactionModal";
import TransferModal from "./modal/TransferModal";
import NavBar from "./navBar/NavBar";
import Preloader from "./preloader/Preloader";

const Layout = ({ children }) => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Recipients Modal    */}
      <RecipientsModal />

      {/* Transfer Modal */}
      <TransferModal />

      {/* Purchased Modal */}
      <PurchasedModal />

      {/* Congratulations Modal */}
      <CongratulationsModal />

      {/* Add Card Modal */}
      <AddCardModal />

      {/* Card Modal */}
      <CardModal />

      {/* Transaction Modal */}
      <TransactionModal />

      {/* AddRecipients Modal */}
      <AddRecipientsModal />

      <NavBar />
      {children}
    </>
  );
};

export default Layout;
