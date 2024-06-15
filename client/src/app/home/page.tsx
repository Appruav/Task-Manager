"use client";
import React, { useEffect, useState } from "react";
import { MacbookScrollDemo } from "@/components/ui/macbook-scroll/macbook-Demo";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
function page() {
  const [displaytasks, setDisplayTasks] = useState<any>([]);
  const [change, setChange] = useState(false);
  const [token, settoken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchtasks = async () => {
      const res = await axios.get("http://localhost:9000/api/fetchtasks");
      if (!res) {
        toast.warn("There is some problem while fetching tasks");
      }
      const tok = localStorage.getItem("token");
      if (tok != null) {
        settoken(tok);
      } else {
        router.push("/login");
      }
      setDisplayTasks(res.data);
    };
    fetchtasks();
  }, [change, token]);
  const handlecheck = async (id: any, ischecked: any) => {
    try {
      const res = await axios.post("http://localhost:9000/api/checktask", {
        id,
        stake: ischecked,
      });
      if (res) {
        setChange(!change);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handledelete = async (id: any) => {
    try {
      console.log(id);
      await axios.post(
        "http://localhost:9000/api/deletetask",
        { id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setChange(!change);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" bg-black">
      {token ? (
        <>
          <button
            className="text-3xl text-white  font-serif bg-red-800 rounded-full px-2 py-2 mt-[1rem] relative"
            onClick={() => {
              console.log(token);
              settoken("");
              localStorage.removeItem("token");
              router.push("/login");
              setChange(!change);
            }}
          >
            Log out
          </button>
          <MacbookScrollDemo setDisplayTasks={setDisplayTasks} />
          <div className="text-center mt-[2rem]">
            <span className="text-white  font-serif text-4xl mt-[2rem]  shadow-md shadow-white px-4 py-2 rounded-full ">
              Your Tasks
            </span>
            <div className="flex flex-row flex-wrap gap-[4rem]">
              {displaytasks.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="item-start gap-4 mt-[5rem] w-[20rem] flex flex-row"
                  >
                    <div className="shadow-md shadow-white text-whitetext-start border-white text-white w-[20rem] h-[10rem] flex flex-col ">
                      <div className="flex flex-row mt-[1rem] ">
                        {item.iscompleted ? (
                          <>
                            <input
                              type="checkbox"
                              checked={true}
                              onChange={() => {
                                handlecheck(item._id, !item.iscompleted);
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              checked={false}
                              onChange={() => {
                                handlecheck(item._id, !item.iscompleted);
                              }}
                            />
                          </>
                        )}

                        <h1 className="text-2xl font-serif ml-2 ">
                          {item.name}
                        </h1>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={30}
                          width={30}
                          onClick={() => {
                            handledelete(item._id);
                          }}
                          className="bg-red-500 ml-[8rem] "
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M10 12V17"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M14 12V17"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M4 7H20"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>

                      <span className="text-start text-xl font-serif">
                        {item.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default page;
