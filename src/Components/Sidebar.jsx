import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const NewTaskButton = () => {
  return (
    <div className="p-2 text-slate-200 justify-between flex items-center cursor-pointer hover:bg-slate-800 hover:shadow mt-3 w-[90%] mx-auto rounded">
      <div className="flex items-center">
        <span className="text-2xl me-1">
          <ion-icon name="flower-outline"></ion-icon>
        </span>
        <span className="">New Task</span>
      </div>
      <span className="text-xl">
        <ion-icon name="create-outline"></ion-icon>
      </span>
    </div>
  );
};

const Tasks = ({
  tasks,
  setShowTask,
  archiveTask,
  setTogglerSidebar,
  toggleSidebar,
}) => {
  const toggle = () => {
    setTogglerSidebar(!toggleSidebar);
    // console.log(toggleSidebar)
  };
  let time = "";
  return (
    <ul className="list-none">
      {tasks.map((task, index) => (
        <React.Fragment key={index}>
          {task.time !== time && (
            <React.Fragment>
              <li
                key={task.id}
                className="text-slate-500 mx-auto px-2 py-1 w-[90%] mt-2"
              >
                <span className="text-[13px]">{task.time}</span>
              </li>
              {(function () {
                time = task.time;
              })()}
            </React.Fragment>
          )}

          <li
            key={index}
            className="text-slate-200 hover:bg-slate-700 w-[90%] mx-auto flex justify-between items-center px-2 py-1 rounded cursor-pointer my-1 hover:shadow"
          >
            <span
              onClick={() => {
                setShowTask(task);
                toggle();
              }}
              className="text-[14px] w-full capitalize"
            >
              {task.task}
            </span>
            <div className="tools">
              <ion-icon
                title="More"
                name="ellipsis-horizontal-outline"
                className=""
              ></ion-icon>
              <ion-icon
                onClick={() => {
                  archiveTask(task.id);
                }}
                title="Archive"
                name="file-tray-outline"
                className="block"
              ></ion-icon>
            </div>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

const Sidebar = ({
  tasks,
  setShowTask,
  setTasks,
  archiveTask,
  toggleSidebar,
  setTogglerSidebar,
}) => {
  return (
    <aside
      className="bg-slate-900 shadow-lg border-r border-slate-700"
      style={{ left: toggleSidebar ? "0" : "-100%" }}
    >
      {/* <span className="text-2xl text-slate-300 cursor-pointer hover:text-slate-400 absolute top-5" style={{right:"-9px"}}>
        <ion-icon name="close-outline"></ion-icon>
      </span> */}
      <NewTaskButton />
      <Tasks
        toggleSidebar={toggleSidebar}
        setTogglerSidebar={setTogglerSidebar}
        archiveTask={archiveTask}
        setTasks={setTasks}
        tasks={tasks}
        setShowTask={setShowTask}
      />
    </aside>
  );
};
export default Sidebar;
