import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar.jsx";
import Container from "./Components/Container.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showTask, setShowTask] = useState([]);
  const [toggleSidebar, setTogglerSidebar] = useState();

  const toggleSidebarHandler = () => {
    setTogglerSidebar(!toggleSidebar);
  };

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem("saveTasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (taskIndex) => {
    const updatedTasks = JSON.parse(localStorage.getItem("saveTasks"))?.filter(
      (item) => {
        if (item.id != taskIndex) return item;
      }
    );
    setTasks([...updatedTasks]);
    updateLocalStorage(updatedTasks);
  };

  const archiveTask = (taskIndex) => {
    updateTask(taskIndex);
  };

  return (
    <div className="flex">
      <Sidebar
        archiveTask={archiveTask}
        tasks={tasks}
        setShowTask={setShowTask}
        setTasks={setTasks}
        toggleSidebar={toggleSidebar}
        setTogglerSidebar={setTogglerSidebar}
      />
      <Container
      toggleSidebar={toggleSidebar}
        toggleSidebarHandler={toggleSidebarHandler}
        tasks={tasks}
        showTask={showTask}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
