import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import LogOutTimer from "./LogoutTimer";

const LogoutConfirm = () => {
  const navigate = useNavigate();

  const [modalLogOut, setModalLogOut] = useState(false);

  const logOutModal = () => {
    setModalLogOut((current) => !current);
  };

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("isAdmin");
    sessionStorage.removeItem("login_datum");
    navigate("/");
  };
  return (
    <>
      {modalLogOut ? (
        <LogoutModal closeModal={logOutModal} Logout={handleLogout}></LogoutModal>
      ) : // <Modal
      //   header={"Logout"}
      //   content={
      //     <div>
      //       <hr className="hr-style"></hr>
      //       <div>
      //         <span>Are you sure, you want to leave Mindmachine ?</span>
      //       </div>
      //       <br></br>
      //       <hr className="hr-style"></hr>
      //       <div className="renameFileOptions-buttons">
      //         <button className="fileOption-button" onClick={logOutModal}>
      //           Cancel
      //         </button>
      //         <button
      //           autoFocus
      //           className="fileOption-button"
      //           onClick={() => handleLogout()}
      //         >
      //           Confirm
      //         </button>
      //       </div>
      //     </div>
      //   }
      //   closeModal={logOutModal}
      // ></Modal>
      null}
      <div className="header-button" onClick={() => setModalLogOut(true)}>
        <p>Logout</p>
        {/* <LogOutTimer></LogOutTimer> */}
      </div>
    </>
  );
};

export default LogoutConfirm;
