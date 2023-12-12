import React, { Children } from "react";

function PopupModel({ visible, setVisible, children } : any) {
  return (
    <div
      style={{backgroundColor:"rgba(0,0,0,0.6)"}}
      className={`${!visible ? '':'hidden'} w-screen h-screen fixed top-0 left-0 z-99999 p-10 `}
    >
      <div
        onClick={() => setVisible(true)}
        className="absolute top-5 right-5
       bg-red-700 text-lg p-3 w-10 h-10 
       hover:bg-red-600
       flex justify-center items-center font-semibold rounded-full text-white cursor-pointer"
      >
        X
      </div>
      <div className="w-full h-full rounded-lg bg-white">
        {children}
      </div>
    </div>
  );
}

export default PopupModel;
