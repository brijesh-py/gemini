const Default = () => {
  return (
    <div className="w-full p-3 mt-[20px] flex justify-center items-center">
      <div className="mx-auto w-[60%] min-w-[300px]">
        <h4 className="text-slate-200 text-xl text-center mb-3">Examples</h4>
        <div className="p-2 w-[100%] text-start cursor-pointer mb-3 border border-slate-500 rounded-sm shadow hover:shadow-2xl hover:bg-slate-700  bg-slate-700">
          <span className="text-slate-300 block">"JavaScript Data Types"</span>
          <small className="text-slate-400">
            JavaScript has several data types that are used to store and manage
            different types of values.
          </small>
        </div>
        <div className="p-2 w-[100%] text-start cursor-pointer mb-3 border border-slate-500 rounded-sm shadow hover:shadow-2xl hover:bg-slate-700  bg-slate-700">
          <span className="text-slate-300 block">"Configure PHP on Kali."</span>
          <small className="text-slate-400">
            Configuring PHP on Kali Linux involves installing the PHP
            interpreter and configuring the web server to work with PHP.
          </small>
        </div>
        <div className="p-2 w-[100%] text-start cursor-pointer mb-3 border border-slate-500 rounded-sm shadow hover:shadow-2xl hover:bg-slate-700  bg-slate-700">
          <span className="text-slate-300 block">
            "Flask-SocketIO Understanding"
          </span>
          <small className="text-slate-400">
            It's an extension for Flask that adds WebSocket support to your
            applications, allowing real-time communication between the server
            and clients.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Default;
