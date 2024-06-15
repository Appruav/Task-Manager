"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function page() {
  const [newPass, setNewpass] = useState("");
  const [passagain, setPassAgain] = useState("");
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split("/");
    const idFromUrl = parts[parts.length - 1];
    setId(idFromUrl);
  }, [id]);
  const handlesubmit = async (event: any) => {
    event.preventDefault();

    if (newPass != passagain) {
      console.log("Does not match");
      return toast.warn("Passwords are not matching");
    } else {
      try {
        await axios
          .post(`http://localhost:9000/api/reset-password/${id}/`, {
            password: newPass,
          })
          .then(() => {
            toast.success("Password has been updated");
            router.push("/login");
            console.log("Done");
          })
          .catch((error) => {
            console.error("Error updating password:", error);
            toast.error("Failed to update password");
          });
      } catch (err) {
        console.log(err);
        toast.error("Failed to update password");
      }
    }
  };
  return (
    <div className="bg-black">
      <form className="flex items-center justify-center h-screen flex-col gap-2 bg-black">
        <div className=" flex flex-col h-[30rem] w-[40rem] items-center justify-center border border-separate bg-white">
          <label className="text-4xl mb-[4rem] font-serif">
            Reset Password
          </label>
          <input
            type="text"
            className="border mb-[2rem]"
            placeholder="Enter new password"
            onChange={(e) => {
              setNewpass(e.target.value);
            }}
          />
          <input
            type="text"
            className="border mb-[1rem]"
            placeholder="Enter  password again"
            onChange={(e) => {
              setPassAgain(e.target.value);
            }}
          />
          <button
            onClick={handlesubmit}
            className="bg-black rounded-full text-white px-4 py-2 mt-2 hover:bg-black hover:text-red-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
