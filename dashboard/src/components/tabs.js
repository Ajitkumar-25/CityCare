import React, { useState } from "react";
import { Link } from "react-router-dom";

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <ul
      className="flex list-none flex-row flex-wrap border-b-0 ps-0"
      role="tablist"
      style={{ backgroundColor: "beige" }}
    >
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/dashboard"
          className={`my-2 block border-x-0 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight ${activeTab === 0 ? 'text-primary border-b-2 border-primary' : 'text-neutral-500'} hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
          onClick={() => handleTabClick(0)}
          role="tab"
          aria-controls="tabs-home02"
          aria-selected={activeTab === 0 ? "true" : "false"}
        >
          All Complaints
        </Link>
      </li>
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/location"
          className={`my-2 block border-x-0 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight ${activeTab === 1 ? 'text-primary border-b-2 border-primary' : 'text-neutral-500'} hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
          onClick={() => handleTabClick(1)}
          role="tab"
          aria-controls="tabs-profile02"
          aria-selected={activeTab === 1 ? "true" : "false"}
        >
          MAP
        </Link>
      </li>
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/alerts"
          className={`my-2 block border-x-0 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight ${activeTab === 2 ? 'text-primary border-b-2 border-primary' : 'text-neutral-500'} hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
          onClick={() => handleTabClick(2)}
          role="tab"
          aria-controls="tabs-messages02"
          aria-selected={activeTab === 2 ? "true" : "false"}
        >
          Alerts
        </Link>
      </li>
      
    </ul>
  );
}

export default Tabs;
