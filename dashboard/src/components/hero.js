import React from "react";
import { Link } from "react-router-dom";
import Features from "./features";
import Org from "./org";
import Faq from "./faq";
import Newsletter from "./newsletter";

function hero() {
  return (
    <>
      <section
        className="  mx-auto  "
        style={{
          backgroundColor: "#D9AFD9",
          backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
        }}
      >
        <div className="px-6 py-12 text-center  md:px-12 lg:text-left ">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
            <div className="grid items-center lg:grid-cols-2">
              <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                <div className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14 backdrop-blur-[30px]">
                  <h1 className="mt-2 mb-16 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
                    The One stop <br />
                    <span className="text-primary">
                      Solution For Your Problems
                    </span>
                  </h1>
                  <Link
                    className="mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    to="/signup"
                    role="button"
                  >
                    Get started
                  </Link>
                </div>
              </div>
              <div className="md:mb-12 lg:mb-0">
                <img
                  src="https://st2.depositphotos.com/34480178/46743/v/450/depositphotos_467437382-stock-illustration-public-services-web-banner-infographics.jpg"
                  className="w-full rounded-lg shadow-lg dark:shadow-black/20"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Features />
      <Org />
      <Faq />
      <Newsletter />
    </>
  );
}

export default hero;
