import "./Container.css";
import React, { useState, useEffect } from "react";
import Default from "./Default.jsx";

const Editor = ({ toggler, setContent }) => {
  return (
    <div
      contentEditable
      className={`p-2 outline-none  text-slate-100 w-[90%] overflow-scroll h-[250px] bg-slate-700 absolute bottom-[80px] rounded shadow-lg  border border-slate-600 ${toggler} editor`}
      spellCheck="true"
      onInput={(e) => {
        setContent(e.target.innerHTML);
      }}
    ></div>
  );
};

const NewTaskContainer = ({ setTasks, tasks, inputRef }) => {
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
    setTasks([...getTask().reverse(), ...tasks]);
  }, []);

  const addTask = () => {
    input &&
      (content && setToggler(toggler == "hidden" ? "visible" : "hidden"),
      saveTask({
        id: generateId(),
        task: input,
        content: content,
        time: time(),
      }),
      setTasks([{ task: input, content: content, time: time() }, ...tasks]));
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
                title={toggler == "visible" ? "Hide Editor" : "Visible Editor"}
                className="text-2xl me-3 bg-slate-500 rounded shadow px-2 text-slate-900 hover:bg-slate-800 hover:text-slate-400 cursor-pointer"
              >
                <ion-icon
                  name={
                    toggler == "hidden" ? "chevron-up-outline" : "close-outline"
                  }
                ></ion-icon>
              </span>
              <input
                title="Massage Gemini AI"
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                className="bg-slate-700  outline-none min-w-[100%]  cursor-text text-white"
                placeholder="Massage Gemini Storage"
                value={input}
                onInput={inputTask}
              />
            </div>
            <span
              title="Send"
              onClick={() => {
                addTask();
                setInput("");
              }}
              className="text-2xl bg-slate-500 rounded shadow px-2 text-slate-900 hover:bg-slate-800 hover:text-slate-400 cursor-pointer"
            >
              <ion-icon name="send-outline"></ion-icon>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

const Single = ({ showTask }) => {
  return (
    <div className="mt-4 w-[100%] mx-auto">
      <div className="flex items-center mb-1">
        <span className=" text-white text-2xl me-3 pt-2 bg-green-600 px-2 shadow  rounded-full ">
          <ion-icon name="flower-outline"></ion-icon>
        </span>
        <div
          title="Task Name"
          className="text-slate-100 rounded-0 min-w-[80%]  font-extrabold text-xl heading capitalize"
        >
          {showTask.task}
        </div>
      </div>
      <div
        title="Task Content"
        className="mt-3 text-slate-300 output overflow-y-scroll h-[65vh]"
        dangerouslySetInnerHTML={{ __html: showTask.content }}
      ></div>
    </div>
  );
};

const TaskContainer = ({ showTask }) => {
  return (
    <section className="rounded h-[75vh]">
      {showTask.length != 0 ? <Single showTask={showTask} /> : <Default />}
    </section>
  );
};

const Header = ({ toggleSidebarHandler, toggleSidebar, setShowTask }) => {
  return (
    <header className="bg-slate-900 py-1 w-full shadow-lg">
      <div className="flex justify-between items-center w-[90%] mx-auto">
        <span
          onClick={() => {
            toggleSidebarHandler();
          }}
          className="text-2xl text-slate-300 cursor-pointer hover:text-slate-400"
          title="Menu"
        >
          <ion-icon name="menu-outline"></ion-icon>
        </span>
        <div className="text-center py-1">
          <b className="text-slate-100 block mb-0" title="Gemini Storage">
            Gemini Storage
          </b>
          <small className="mt-0 text-slate-400 font-bold" title="Version 3.5">
            Version 3.5
          </small>
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
            onClick={() => {
              setShowTask([]);
            }}
            name={toggleSidebar ? "close-outline" : "create-outline"}
            title={toggleSidebar ? "Close" : "Create"}
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
  inputRef,
  setShowTask,
}) => {
  return (
    <main className="relative mx-auto">
      <Header
        toggleSidebarHandler={toggleSidebarHandler}
        toggleSidebar={toggleSidebar}
        setShowTask={setShowTask}
      />
      <TaskContainer showTask={showTask} />
      <NewTaskContainer tasks={tasks} setTasks={setTasks} inputRef={inputRef} />
    </main>
  );
};
export default Container;
