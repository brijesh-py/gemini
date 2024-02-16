import React from "react";
import Settings from "./Settings.jsx";
import "./Sidebar.css";

const NewTaskButton = ({ setShowTask, setTogglerSidebar, toggleSidebar }) => {
  const toggle = () => {
    setTogglerSidebar(!toggleSidebar);
  };
  return (
    <div
      title="New Task"
      onClick={() => {
        toggleSidebar && toggle();
        setShowTask([]);
      }}
      className="p-2 border border-slate-900 hover:border-slate-500 text-slate-200 justify-between flex items-center cursor-pointer hover:bg-slate-700 hover:shadow-xl bg-slate-800 mt-3 w-[90%] mx-auto rounded"
    >
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
  };
  let time = "";
  return (
    <ul className="list-none mt-3 h-[75vh] overflow-scroll">
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
                toggleSidebar && toggle();
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
      <NewTaskButton
        toggleSidebar={toggleSidebar}
        setTogglerSidebar={setTogglerSidebar}
        setShowTask={setShowTask}
      />
      <Tasks
        toggleSidebar={toggleSidebar}
        setTogglerSidebar={setTogglerSidebar}
        archiveTask={archiveTask}
        setTasks={setTasks}
        tasks={tasks}
        setShowTask={setShowTask}
      />
      <Settings />
    </aside>
  );
};
export default Sidebar;
