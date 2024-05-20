import React from "react";

function team() {
  return (
    <section
      className="bg-white dark:bg-gray-900"
      style={{
        backgroundColor: "#D9AFD9",
        backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
      }}
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Team
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400"></p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="Assets/Aman.jpeg"
                alt="Michael Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="/">Aman Upadhyay</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                21103263@mail.jiit.ac.in
              </span>
            </div>
          </div>
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="Assets/WhatsApp Image 2024-05-09 at 08.39.58.jpeg"
                alt="Bonnie Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="/">Ajit Kumar</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                21103317@mail.jiit.ac.in
              </span>
            </div>
          </div>
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="Assets/Ashutosh.jpeg"
                alt="Jese Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="/">Aashutosh Pradhan</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                21103242@mail.jiit.ac.in
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default team;
