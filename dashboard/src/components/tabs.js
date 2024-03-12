import React from "react";
import {
  Tab,
  initTE,
} from "tw-elements";
import { Link } from "react-router-dom";

initTE({ Tab });
function Tabs() {
  return (
    <ul
      className="  flex list-none flex-row flex-wrap border-b-0 ps-0"
      role="tablist"
      data-twe-nav-ref
      style={{backgroundColor:"beige"}}
    >
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/dashboard"
          className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
          data-twe-toggle="pill"
          data-twe-nav-active
          role="tab"
          aria-controls="tabs-home02"
          aria-selected="true"
        >
          All Complaints
        </Link>
      </li>
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/location"
          className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
          data-twe-toggle="pill"
          data-twe-target="#tabs-profile02"
          role="tab"
          // data-twe-nav-active
          aria-controls="tabs-profile02"
          aria-selected="false"
        >
          MAP
        </Link>
      </li>
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/alerts"
          className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
          data-twe-toggle="pill"
          data-twe-target="#tabs-messages02"
          role="tab"
          aria-controls="tabs-messages02"
          aria-selected="false"
        >
          Alerts
        </Link>
      </li>
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          href="#tabs-contact02"
          className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent bg-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-400 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent dark:text-neutral-600"
          data-twe-toggle="pill"
          data-twe-target="#tabs-contact02"
          role="tab"
          aria-controls="tabs-contact02"
          aria-selected="false"
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}

export default Tabs;
