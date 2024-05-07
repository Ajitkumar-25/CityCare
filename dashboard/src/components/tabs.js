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
          className="my-2 block border-x-0 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-md font-medium uppercase leading-tight text-neutral-500"
          onClick={() => handleTabClick(0)}
          style={{ color: activeTab === 0 ? "#1e40af" : "inherit", borderBottom: activeTab === 0 ? "2px solid #1e40af" : "none" }}
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
          className="my-2 block border-x-0 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-md font-medium uppercase leading-tight text-neutral-500"
          onClick={() => handleTabClick(1)}
          style={{ color: activeTab === 1 ? "#1e40af" : "inherit", borderBottom: activeTab === 1 ? "2px solid #1e40af" : "none" }}
          role="tab"
          aria-controls="tabs-profile02"
          aria-selected={activeTab === 1 ? "true" : "false"}
        >
          MAP
        </Link>
      </li>
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/analytics"
          className="my-2 block border-x-0 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-md font-medium uppercase leading-tight text-neutral-500"
          onClick={() => handleTabClick(2)}
          style={{ color: activeTab === 2 ? "#1e40af" : "inherit", borderBottom: activeTab === 2 ? "2px solid #1e40af" : "none" }}
          role="tab"
          aria-controls="tabs-profile02"
          aria-selected={activeTab === 2 ? "true" : "false"}
        >
          ANALYTICS
        </Link>
      </li>
      <li role="presentation" className="flex-grow basis-0 text-center">
        <Link
          to="/alerts"
          className="my-2 block border-x-0 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-md font-medium uppercase leading-tight text-neutral-500"
          onClick={() => handleTabClick(3)}
          style={{ color: activeTab === 3 ? "#1e40af" : "inherit", borderBottom: activeTab === 3 ? "2px solid #1e40af" : "none" }}
          role="tab"
          aria-controls="tabs-messages02"
          aria-selected={activeTab === 3 ? "true" : "false"}
        >
          Alerts
        </Link>
      </li>
    </ul>
  );
}

export default Tabs;
