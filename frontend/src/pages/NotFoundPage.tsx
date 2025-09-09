import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-D-blue overflow-hidden">

      <div
        className="w-full h-full bg-contain bg-no-repeat bg-top"
        style={{
          backgroundImage: "url('/404.png')",
          backgroundPosition: "center top 80px",
        }}
      ></div>


      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-D-blue to-transparent pointer-events-none"></div>

     
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-D-blue to-transparent pointer-events-none"></div>
    </div>
  );
};


export default NotFoundPage;
