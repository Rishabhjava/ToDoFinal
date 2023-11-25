import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import addIcon from "../assets/icon-add-task-mobile.svg";
import subtaskIcon from "../assets/icon-down-right.svg";

export default function AddEditTaskModal({
  type,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, parent: null, id: uuidv4() },
    { title: "", isCompleted: false, parent: null, id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    console.log('THIS IS THE FIRST LOAD', subtasks);
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask,  parent: subtask.parent === undefined ? null : subtask.parent, id: subtask.id};
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }
  
  

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChangeSubtasks = (id, newValue) => {
    console.log(subtasks);
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id && el.parent !== id));
    if(subtasks.length == 0){
      console.log('something is wrogn');
      setIsFirstLoad(true);
    }
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onSubmit = (type) => {
    console.log(subtasks);
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      className={`modal-container ${type === "add" ? "dimmed" : ""}`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className="modal">
        <h3>{type === "edit" ? "Edit" : "Add New"} Task</h3>
        <label htmlFor="task-name-input">Task Name</label>
        <div className="input-container">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            placeholder="e.g. Take coffee break"
            className={!isValid && !title.trim() ? "red-border" : ""}
          />
          {!isValid && !title.trim() && (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          )}
        </div>

        <label htmlFor="task-name-input">Description</label>
        <div className="description-container">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        <label>Subtasks</label>
        <div className="modal-columns">
          {subtasks.filter(subtask => subtask.parent === null || subtask.parent === undefined).map((subtask, index) => {
            //console.log(subtask);
            return (
              <div>
              <div className="modal-column" key={index}>
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      onChangeSubtasks(subtask.id, e.target.value);
                    }}
                    type="text"
                    value={subtask.title}
                    className={
                      !isValid && !subtask.title.trim() ? "red-border" : ""
                    }
                  />
                  {!isValid && !subtask.title.trim() ? (
                    <span className="cant-be-empty-span text-L">
                      {" "}
                      Can't be empty
                    </span>
                  ) : null}
                </div>
                <img
                  src={addIcon}
                  alt="add-column-icon"
                  onClick={() => {
                    //console.log('subtask ID', subtask.id)
                    setSubtasks((state) => [
                      ...state,
                      { title: "", isCompleted: false, parent: subtask.id, id: uuidv4() },
                    ]);
                  }}
                />
                <img
                  src={crossIcon}
                  alt="delete-column-icon"
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                />
              </div>
              <div className="modal-columns">
                    {subtasks.filter(insideSubtask => insideSubtask.parent == subtask.id).map((subtask, index) => {
                      return (
                        <div className="modal-column" key={subtask.id}>
                          <img
                            src={subtaskIcon}
                            alt="icon-down-right"
                          />
                          <div className="sub-input-container">
                            <input
                              onChange={(e) => {
                                onChangeSubtasks(subtask.id, e.target.value);
                              }}
                              type="text"
                              value={subtask.title}
                              className={
                                !isValid && !subtask.title.trim() ? "red-border" : ""
                              }
                            />
                            {!isValid && !subtask.title.trim() ? (
                              <span className="cant-be-empty-span text-L">
                                {" "}
                                Can't be empty
                              </span>
                            ) : null}
                          </div>
                          <img
                            src={crossIcon}
                            alt="delete-column-icon"
                            onClick={() => {
                              onDelete(subtask.id);
                              // setSubtasks((state) => [
                              //   ...state,
                              //   { title: "", isCompleted: false, id: uuidv4() },
                              // ]);
                            }}
                          />
                        </div>
                      );
                    })}
                 </div>

              </div>
              
            );
          })}
        </div>

        <button
          onClick={() => {
            setSubtasks((state) => [
              ...state,
              { title: "", isCompleted: false, parent: null, id: uuidv4() },
            ]);
          }}
          className="add-column-btn btn-light"
        >
          + Add New Sub task
        </button>

        <div className="select-column-container">
          <label className="text-M">Current Status</label>
          <select
            className="select-status text-L"
            value={status}
            onChange={onChangeStatus}
          >
            {columns.map((col, index) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
              setIsAddTaskModalOpen(false);
              type === "edit" && setIsTaskModalOpen(false);
            }
          }}
          className="create-btn"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
