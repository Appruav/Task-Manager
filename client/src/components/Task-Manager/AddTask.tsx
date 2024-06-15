import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function AddTask({ setDisplayTasks }: any) {
  const [name, setNamee] = useState("");
  const [description, setdescription] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchtasks = async () => {
      const res = await axios.get("http://localhost:9000/api/fetchtasks");
      if (!res) {
        toast.warn("There is some problem while fetching tasks");
      }
      setDisplayTasks(res.data);
    };
    fetchtasks();
  }, [refresh]);
  const handlesubmit = async () => {
    try {
      await axios.post("http://localhost:9000/api/addtask", {
        name,
        description,
      });
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-white flex flex-col">
      <h1 className="text-center  py-2 underline font-bold">Add Your Tasks</h1>
      <div className="flex flex-col justify-center items-center mt-[4rem] gap-2">
        <label className="mt-[1rem]">Enter the Name of Your Task</label>
        <input
          className="text-black"
          type="text"
          onChange={(e) => {
            setNamee(e.target.value);
          }}
        />
        <label>Enter the description</label>
        <input
          className="text-black"
          type="text"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={handlesubmit}
          className="border rounded-full px-4 py-2 mt-[1rem] hover:bg-red-900"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTask;
