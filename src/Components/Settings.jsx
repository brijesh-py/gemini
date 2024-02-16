const Settings = () => {
  return (
    <div className=" w-full ">
      <div
        onClick={() => {
          location.href = "https://github.com/brijesh-py";
        }}
        title="Settings"
        className="p-2 border border-slate-900 hover:border-slate-700 text-slate-200 justify-start flex items-center cursor-pointer hover:bg-slate-950 hover:shadow-xl  mt-3 w-[90%] mx-auto rounded "
      >
        <div className="px-3 me-3 rounded-full py-1 pb-3 block bg-red-500 flex items-center">
          {navigator.userAgentData?.brands[2].brand[0] || "Gemini"[0]}
        </div>
        <span>{navigator.userAgentData?.brands[2].brand || "Gemini"}</span>
      </div>
    </div>
  );
};

export default Settings;
