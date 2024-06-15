"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/api/signup", {
        email,
        password,
      });
      console.log(response.data);
      toast.success("User has signed up");
      router.push("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.warn("There is some error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" h-[50vh] w-[50rem] flex flex-col items-center justify-center shadow-md rounded-lg p-8 hover:scale-110 transition-transform bg-white"
      >
        <h1 className="text-4xl font-serif mb-4 ">Sign Up</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
          className="mb-4 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password"
          required
          className="mb-4 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-black transition-colors"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
