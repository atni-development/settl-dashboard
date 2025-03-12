import AddCardModal from "./modal/AddCardModal";
import AddRecipientsModal from "./modal/AddRecipientsModal";
import CardModal from "./modal/CardModal";
import CardsCongratulationsModal from "./modal/CardsCongratulationsModal";
import CongratulationsModal from "./modal/CongratulationsModal";
import PendingModal from "./modal/PendingModal";
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

      <CardsCongratulationsModal />
      
      <PendingModal />

      {/* Add Card Modal */}
      <AddCardModal />

      {/* Card Modal */}
      <CardModal />

      {/* Transaction Modal */}
      

      {/* AddRecipients Modal */} 
      <AddRecipientsModal />

      <NavBar />
      {children}
    </>
  );
};

export default Layout;
