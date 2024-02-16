import "./Container.css";
import React, { useState, useEffect, useId } from "react";

const Editor = ({ toggler, setContent }) => {
  return (
    <div
      contentEditable
      className={`p-2 outline-none  text-slate-100 w-[90%] overflow-scroll h-[250px] bg-slate-700 absolute bottom-[80px] rounded shadow-lg  border border-slate-600 ${toggler} editor`}
      spellCheck="true"
      onInput={(e) => {
        setContent(e.target.innerHTML);
      }}
    >
    </div>
  );
};

const NewTaskContainer = ({ setTasks, tasks }) => {
  const [toggler, setToggler] = useState("hidden");
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");

  const inputTask = (e) => {
    e.target.value ? setInput(e.target.value) : {};
  };
  const time = () => {
    const date = new Date();
    let month = "";
    switch (date.getMonth()) {
      case 0:
        month = "Jan";
      case 1:
        month = "Feb";
      case 2:
        month = "Mar";
      case 3:
        month = "Apr";
      case 4:
        month = "May";
      case 5:
        month = "Jun";
      case 6:
        month = "Jul";
      case 7:
        month = "Aug";
      case 8:
        month = "Sep";
      case 9:
        month = "Oct";
      case 10:
        month = "Nov";
      case 11:
        month = "Dec";
      default:
        break;
    }
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const saveTask = (task) => {
    let response = [];
    if (localStorage.getItem("saveTasks")) {
      response.push(...JSON.parse(localStorage.getItem("saveTasks")));
    }
    if (response) {
      localStorage.setItem("saveTasks", JSON.stringify([...response, task]));
    } else {
      localStorage.setItem("saveTasks", JSON.stringify(task));
    }
  };

  const getTask = () => {
    if (localStorage.getItem("saveTasks")) {
      return JSON.parse(localStorage.getItem("saveTasks"));
    }
    return [];
  };

  const generateId = () => Math.random().toString(36).slice(2);

  useEffect(() => {
    setTasks([...getTask(), ...tasks]);
  }, []);

  const addTask = () => {
    setToggler(toggler == "hidden" ? "visible" : "hidden");
    saveTask({ id: generateId(), task: input, content: content, time: time() });
    setTasks([{ task: input, content: content, time: time() }, ...tasks]);
  };

  return (
    <div className=" w-[90%] mx-auto overflow-hidden">
      <Editor setContent={setContent} toggler={toggler} />
      <div className="w-[100%] p-2 border border-slate-600 bg-slate-700 rounded-lg shadow-lg mt-4 mx-auto">
        <form
          className="w-[100%]"
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
            setInput("");
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <span
                onClick={() => {
                  setToggler(toggler == "hidden" ? "visible" : "hidden");
                }}
                className="text-2xl me-3 bg-slate-500 rounded shadow px-2 text-slate-900 hover:bg-slate-800 hover:text-slate-400 cursor-pointer"
              >
                <ion-icon
                  name={
                    toggler == "hidden"
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                ></ion-icon>
              </span>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                className="bg-slate-700  outline-none min-w-[100%]  cursor-text text-white"
                placeholder="Massage Gemini AI"
                value={input}
                onInput={inputTask}
              />
            </div>
            <span
              onClick={() => {
                addTask();
                setInput("");
              }}
              className="text-2xl bg-slate-500 rounded shadow px-2 text-slate-900 hover:bg-slate-800 hover:text-slate-400 cursor-pointer"
            >
              <ion-icon name="add-outline"></ion-icon>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskContainer = ({ showTask }) => {
  return (
    <section className="rounded h-[73vh] ">
      <div className="mt-4">
        <div className="flex items-center mb-1">
          <span className=" text-white text-2xl me-3 bg-green-600 px-2 shadow pb-1 rounded-full ">
            <ion-icon name="flower-outline"></ion-icon>
          </span>
          <b className="text-slate-100  font-extrabold text-xl heading capitalize">
            {showTask.task}
          </b>
        </div>
        <div
          className="mt-3 text-slate-300 output overflow-y-scroll h-[65vh]"
          onChange={(e) => {}}
          dangerouslySetInnerHTML={{ __html: showTask.content }}
        ></div>
      </div>
    </section>
  );
};

const Header = ({ toggleSidebarHandler, toggleSidebar }) => {
  return (
    <header className="bg-slate-900 py-1 w-full shadow-lg">
      <div className="flex justify-between items-center w-[90%] mx-auto">
        <span
          onClick={() => {
            toggleSidebarHandler();
          }}
          className="text-2xl text-slate-300 cursor-pointer hover:text-slate-400"
        >
          <ion-icon name="menu-outline"></ion-icon>
        </span>
        <div className="text-center py-1">
          <b className="text-slate-100 block mb-0">Gemini Storage</b>
          <small className="mt-0 text-slate-400 font-bold">Version 3.5</small>
        </div>
        <span
          onClick={() => {
            if (toggleSidebar) {
              toggleSidebarHandler();
            }
          }}
          className="text-2xl text-slate-300 cursor-pointer hover:text-slate-400"
        >
          <ion-icon
            name={toggleSidebar ? "close-outline" : "create-outline"}
          ></ion-icon>
        </span>
      </div>
    </header>
  );
};

const Container = ({
  setTasks,
  showTask,
  tasks,
  toggleSidebarHandler,
  toggleSidebar,
}) => {
  return (
    <main className="relative mx-auto">
      <Header
        toggleSidebarHandler={toggleSidebarHandler}
        toggleSidebar={toggleSidebar}
      />
      <TaskContainer showTask={showTask} />
      <NewTaskContainer tasks={tasks} setTasks={setTasks} />
    </main>
  );
};
export default Container;
