import Tabs from "./tabs";
import { useState, useEffect } from "react";
import axios from "axios";

import { Modal, Ripple, initTE } from "tw-elements";

// import { Link } from "react-router-dom";

function Dashboard() {
  // fetch all complaints

  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [modaldata, setModalData] = useState({
    _id: "",
    title: "",
    description: "",
    media: "",
    locationInfo: "",
    createdAt: "",
    status: "",
    type: "",
    message: "",
    citizenId: "",
  });

  useEffect(() => {
    initTE({ Modal, Ripple });
    const org_info = JSON.parse(
      localStorage.getItem("organization")
    ).Organization;
    const token = localStorage.getItem("token").toString();
    // console.log(org_info);
    console.log(org_info.category);
    let data = {
      category: org_info.category.toString(),
      searchQuery: searchQuery.toString(),
    };
    if (data.category == null) {
      data.category = "";
    }
    // console.log(data);
    axios
      .post("https://citycare.onrender.com/api_all_complaints_organization", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.complaints);
        setComplaints(res.data.complaints);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery]);

  const showDetails = (id) => {
    fetch(`https://citycare.onrender.com/api_all_complaints_organization/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModalData(data);
        console.log(data);
      });
  };

  const handleSubmit = () => {
    console.log(modaldata);
    fetch(`https://citycare.onrender.com/api_update_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: modaldata.complaint.status,
        message: modaldata.complaint.message,
        complaintId: modaldata.complaint._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  };

  return (
    <>
      <Tabs />

      {/* <!-- Modal --> */}

      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalScrollable"
        tabIndex="-1"
        aria-labelledby="exampleModalScrollableLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative h-[calc(100%-1rem)] w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div className="pointer-events-auto relative flex max-h-[100%] w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              <h5
                className="text-xl font-medium leading-normal text-surface dark:text-white"
                id="exampleModalScrollableLabel"
              >
                {modaldata.complaint ? modaldata.complaint.title : "Loading..."}{" "}
                : By {" "}
                
                {modaldata.complaint
                  ? modaldata.complaint.citizenId.fname +
                    " " +
                    modaldata.complaint.citizenId.lname
                  : "Loading..."}
              </h5>
              <div>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  id="person"
                >
                  <path
                    fill="#212121"
                    d="M11.5,8 C12.3284271,8 13,8.67157288 13,9.5 L13,10 C13,11.9714437 11.14049,14 8,14 C4.85950997,14 3,11.9714437 3,10 L3,9.5 C3,8.67157288 3.67157288,8 4.5,8 L11.5,8 Z M8,1.5 C9.51878306,1.5 10.75,2.73121694 10.75,4.25 C10.75,5.76878306 9.51878306,7 8,7 C6.48121694,7 5.25,5.76878306 5.25,4.25 C5.25,2.73121694 6.48121694,1.5 8,1.5 Z"
                  ></path>
                </svg>
              </div>
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="relative overflow-y-auto p-4">
              <span>Description:</span>
              <p className="text-xl">
                {modaldata.complaint
                  ? modaldata.complaint.description
                  : "Description Loading..."}
              </p>

              <div className="my-4 border rounded-3xl">
                {modaldata.complaint ? (
                  <img src={`${modaldata.complaint.media}`} alt="img"></img>
                ) : (
                  "media loading"
                )}
              </div>

              <div className="">
                <p>
                  Complaint Address:
                  <br />
                  {modaldata.complaint
                    ? modaldata.complaint.locationInfo.address
                    : "Location Loading..."}
                </p>
              </div>
<br/>
              <div>
                <p>
                  Complaint Date : {" "}
                  {modaldata.complaint
                    ? modaldata.complaint.createdAt
                    : "Date Loading..."}
                </p>
              </div>

              <label
                htmlFor="status"
                className="block mt-4 text-xl font-medium text-gray-700"
              >
                Status
              </label>
              <select
                onChange={(e) => {
                  setModalData({
                    ...modaldata,
                    complaint: {
                      ...modaldata.complaint,
                      status: e.target.value,
                    },
                  });
                  // console.log(modaldata)
                }}
              >
                <option value="">
                  {modaldata.complaint
                    ? modaldata.complaint.status
                    : "Select a status"}
                </option>
                <option value="Not Viewed">Not Viewed</option>
                <option value="in Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <label
                htmlFor="message"
                className="block mt-4 text-xl font-medium text-gray-700"
              >
                Updates
              </label>
              {modaldata.complaint ? (
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  placeholder="Add a message"
                  value={modaldata.complaint.message}
                  onChange={(e) => {
                    setModalData({
                      ...modaldata,
                      complaint: {
                        ...modaldata.complaint,
                        message: e.target.value,
                      },
                    });
                  }}
                ></textarea>
              ) : (
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  placeholder="Add a message"
                  value=""
                  onChange={(e) => {
                    setModalData({
                      ...modaldata,
                      complaint: {
                        ...modaldata.complaint,
                        message: e.target.value,
                      },
                    });
                  }}
                ></textarea>
              )}

              {/* <div style={{ height: "400px" }}></div>
              <p>This content should appear at the bottom after you scroll.</p> */}
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <section
        className="text-black-400 body-font"
        style={{
          backgroundColor: "#D9AFD9",
          backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
        }}
      >
        <div className="container px-5 py-10 mx-auto">
          <div className="mb-5">
            <form className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="flex flex-wrap m-4 ">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div> */}

            {complaints.map((complaint, idx) => (
              <div key={idx} className="p-4  md:w-1/3 ">
                <div className="h-full  rounded-lg overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={`${complaint.media}`}
                    alt="blog"
                  />
                  <div className="p-6 bg-white">
                    {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                      {complaint.type}
                    </h2> */}
                    <div className="flex">
                      <h1 className="title-font text-lg font-medium text-black mb-3">
                        {complaint.title}
                      </h1>
                      <button className="flex ml-auto  ">
                        {/* show batches according to atstus */}
                        {complaint.status === "Not Viewed" ? (
                          <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            Not Viewed
                          </span>
                        ) : complaint.status === "in Progress" ? (
                          <span className="bg-yellow-100 text-yellow -800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            In progress
                          </span>
                        ) : (
                          <span className="bg-green-200 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Resolved
                          </span>
                        )}
                      </button>
                    </div>

                    {/* <p className="leading-relaxed mb-3">
                      {complaint.description}
                    </p> */}

                    <span className="mt-2">
                      {complaint.locationInfo.address}
                    </span>

                    <div className="flex items-center flex-wrap mt-4 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 C 22.81904 22.572762 22 23.655572 22 25 C 22 25.471362 22.108361 25.906202 22.289062 26.296875 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.703125 27.710938 C 24.093798 27.891639 24.528638 28 25 28 C 26.7 28 28 26.7 28 25 C 28 23.655572 27.18096 22.572762 26 22.173828 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path>
                      </svg>
                      <span className="ml-2">
                        {complaint.diffDays} day ago...
                      </span>
                      <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"
                          />
                        </svg>
                        {complaint.upVotes}
                      </span>
                      <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        6
                      </span>
                    </div>
                    <button
                      type="button"
                      data-te-toggle="modal"
                      data-te-target="#exampleModalScrollable"
                      style={{ backgroundColor: "#7d5fff" }}
                      className="w-full mt-6 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={(e) => showDetails(complaint._id)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              data-te-toggle="modal"
              data-te-target="#exampleModalScrollable"
              style={{ backgroundColor: "#7d5fff" }}
              className="w-full mt-6 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hidden"
            >
              Details
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
