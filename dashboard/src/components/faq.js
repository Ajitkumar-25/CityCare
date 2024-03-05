import React from "react";
import { initFlowbite } from "flowbite";
function faq() {
  initFlowbite();
  return (
    <section style={{ backgroundColor: "beige" }} >
      <div
        className="mx-auto w-full max-w-screen-xl  p-4 py-6 lg:py-8"
        
      >
        <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-black-900 dark:text-white md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div id="accordion-collapse" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black-200 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-controls="accordion-collapse-body-1"
            >
              <span className="text-2xl">
                How can I track the status of my complaints?
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className=" text-2xl p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-2 text-black-500 dark:text-black-400">
                You can easily track the status of your complaints by logging
                into your account and navigating to the "My Complaints" section.
                Here, you'll find a list of all your submitted complaints along
                with their current status (e.g., In Progress, Resolved). You'll
                also receive timely notifications and updates on any changes to
                your complaints' status.
              </p>
            </div>
          </div>
          <h2 id="accordion-collapse-heading-2">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-collapse-body-2"
              aria-expanded="false"
              aria-controls="accordion-collapse-body-2"
            >
              <span className="text-2xl">
                Can I view complaints from other users in my locality?
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-2"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-2"
          >
            <div className=" text-2xl p-5 border border-b-0 border-gray-200 dark:border-gray-700">
              <p className="mb-2 text-black-500 dark:text-gray-400">
                Yes, you can view complaints from other users in your locality.
                Our platform encourages transparency and community involvement
                by allowing users to see and engage with complaints raised by
                others. You can upvote, downvote, or indicate if you're
                experiencing the same issue, which helps prioritize and address
                community concerns effectively.
              </p>
            </div>
          </div>
          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-collapse-body-3"
              aria-expanded="false"
              aria-controls="accordion-collapse-body-3"
            >
              <span className="text-2xl">
                How are complaints prioritized and resolved?
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-3"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-3"
          >
            <div className=" text-2xl p-5 border border-t-0 border-gray-200 dark:border-gray-700">
              <p className="mb-2 text-black-500 dark:text-gray-400">
                Complaint prioritization and resolution are based on several
                factors, including the severity of the issue, the number of
                votes received from the community, and the resources available.
                Our platform employs advanced algorithms and analytics to
                analyze complaint data, identify trends, and allocate resources
                efficiently. Additionally, complaints may be escalated
                automatically based on predefined rules or expert systems,
                ensuring timely and effective resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default faq;
