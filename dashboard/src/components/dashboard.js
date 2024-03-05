import React from "react";

function dashboard() {
  return (
   
    <section
      className="bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundColor: "#D9AFD9",
        backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="text-7xl text-">Hello {} You are Logged In</h2>
      </div>
    </section>
  );
}

export default dashboard;
