import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

export default function Subtask({ index, taskIndex, colIndex, parent}) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  //const subtask = task.subtasks.find((subtask, i) => i === index);
  let subtask;
  if(parent != null && parent != undefined){
    subtask = task.subtasks.filter(subtask => subtask.parent === parent).find((subtask, i) => i === index);
    console.log('hello?', subtask);
  }else{
    console.log('hellossss', parent, task.subtasks);
    subtask = task.subtasks.filter(subtask => subtask.parent == null || subtask.parent == undefined).find((subtask, i) => i === index);
  }
  console.log(subtask);
  const checked = subtask.isCompleted;


  //console.log(index, taskIndex, parent);
  
  const onChange = (e) => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex, parent})
    );
  };

  return (
    <div className="subtask">
      <input
        className="subtask-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={`subtask-text text-M ${checked && "checked"}`}>
        {subtask.title}
      </p>
    </div>
  );
}
