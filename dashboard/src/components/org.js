import React from "react";

function org() {
  return (
    <section className="bg-white dark:bg-gray-900" style={{backgroundColor:"#D9AFD9",backgroundImage:"linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)"}}>
      <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-black-900 dark:text-white md:text-5xl">
          Problems we solve 
        </h2>
        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-5 dark:text-gray-400">
          <a href="/" className="flex justify-center items-center">
            <img src="Assets/road.png" alt="" className="responsive-image"/>
          </a>
          <a href="/" className="flex justify-center items-center">
            <img src="/Assets/water-tap.png" alt=""/>
          </a>
          <a href="/" className="flex justify-center items-center">
          <img src="/Assets/garbage.png" alt=""/>
          </a>

          <a href="/" className="flex justify-center items-center">
          <img src="/Assets/electricity.png" alt=""/>
          </a>
          <a href="/" className="flex justify-center items-center">
          <img src="/Assets/animal.png" alt=""/>
          </a>
          
        </div>
      </div>
    </section>
  );
}

export default org;
