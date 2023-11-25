import React from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth';
import { saveStateToFirebase } from '../firebaseService'; // Adjust the path as needed
import store from '../redux/store'; // Adjust the path as needed

export default function ElipsisMenu({
  type,
  setOpenEditModal,
  setOpenDeleteModal,
}) {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    // Get the current state from the Redux store
    const currentState = store.getState();

    // Save the state to Firebase
    saveStateToFirebase(currentState).then(() => {
      // After saving the state, proceed with the logout
      signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/Login");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        console.log(error)
        });
    }).catch((error) => {
      // Handle errors that occurred during state saving
      console.error("Error saving state before logout:", error);
    });
  }

  return (
    <div className="elipsis-menu text-L">
      <p onClick={() => setOpenEditModal()}>
        Edit {type}
      </p>
      <p onClick={() => setOpenDeleteModal()} className="elipsis-menu-red">
        Delete {type}
      </p>
      <p onClick={handleLogout} className="elipsis-menu-red">
        Logout 
      </p>
    </div>
  );
}
