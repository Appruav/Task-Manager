"use client";
import axios from "axios";
import { log } from "console";
import React, { useState } from "react";

function page() {
  const [email, setEmail] = useState("");
  const forgotpass = async () => {
    console.log(email);
    console.log("Sending pass");
    await axios.post("http://localhost:9000/api/forgotpass", {
      email: email,
    });
  };
  return (
    <div className="flex flex-row items-center justify-center h-screen gap-2">
      <label>Enter Your email</label>
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="border "
      />

      <button
        className="border border-black bg-black text-white rounded-full px-2 py-2"
        onClick={forgotpass}
      >
        Send
      </button>
    </div>
  );
}

export default page;
