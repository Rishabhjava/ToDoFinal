
import { NavLink, useNavigate } from 'react-router-dom'
import { saveStateToFirebase, fetchStateFromFirebase, fetchDefaultStateFromFirebase } from '../firebaseService'; // Adjust the path as per your directory structure
import Header from "../components/Header";
import Board from "../components/Board";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import EmptyBoard from "../components/EmptyBoard";
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

// Importing the Redux store
import store from '../redux/store'; // Adjust the path as per your directory structure
import {loadEntireState} from '../redux/store'; // Adjust the path as per your directory structure

import firebase from '../firebase'; 


function Kanban() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const theme = useSelector((state) => state.theme);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state to track data loading

  
  // You can call this function whenever you need to save the state.

  useEffect(() => {

    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
    if (user) {
      setIsDataLoaded(false);
      fetchStateFromFirebase().then(savedState => {
        if (savedState) {
          console.log('found state', savedState)
          // State exists, load it into Redux
          console.log('board.length', boards.length)
          dispatch(loadEntireState(savedState));
          setIsDataLoaded(true);
        } else {
          console.log('didnt find state')
          // Fetch the default state from Firebase
          fetchDefaultStateFromFirebase().then(defaultState => {
            console.log('default state', defaultState)
            dispatch(loadEntireState(defaultState));
            saveStateToFirebase(defaultState);
            setIsDataLoaded(true);
          }).catch(error => {
            console.error("Error fetching default state:", error);
          });
        }
      }).catch(error => {
        console.error("Error fetching state:", error);
        setIsDataLoaded(true);
      });
      
    }
    else{
      console.log('no user found');
      navigate('/login')
    }
  }, []);

  // Run only when boards are updated and data is loaded
  useEffect(() => {
    if (isDataLoaded && boards != null) {
      
      console.log('loading boards');
      const activeBoard = boards.find((board) => board.isActive);
      if (!activeBoard && boards.length > 0) {
        dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      }
      const currentState = store.getState();

      //Save the state to Firebase
      saveStateToFirebase(currentState)
    }
        // Get the current state from the Redux store
    

  }, [boards, dispatch, isDataLoaded]);

  

  return (
    <div className={`app ${theme}`}>
      {!isDataLoaded ? (
        <div className="loader">Loading...</div> // Simple text loader, can be replaced with a spinner
      ) : boards?.length > 0 ? (
        <>
          <Header />
          <Board />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default Kanban;