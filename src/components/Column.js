import React from "react";
import Task from "./Task";
import "../styles/Column&Task.css";
import boardsSlice from "../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Column({ colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  // if(!col.tasks) col.tasks = []

  const handleOnDrop = (e) => {
    //console.log(e);
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));

    if (colIndex !== prevColIndex) {
      dispatch(boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  }

  const handleOnDragOver = (e) => {
    //console.log(e);
    e.preventDefault()
  }

  //console.log(col.tasks.length, 'this is the cols');

  return (
<div className="column" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
    <p className="col-name heading-S">
      {col?.name} ({col?.tasks?.length ?? 0})
    </p>
    {
      (col.tasks && col.tasks.length ? col.tasks : []).map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))
    }
  </div>  
  );
}
