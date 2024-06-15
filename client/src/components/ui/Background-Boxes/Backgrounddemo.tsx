"use client";
import React from "react";
import { Boxes } from "./Boxes";
import { cn } from "@/utils/cn";
import Link from "next/link";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Welcome to out Task Manager Web App
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Handle All your tasks in one place and increase your prodcuctivity
      </p>
      <p className="text-center mt-2 text-neutral-300 relative z-20 ">
        New User?
        <Link className="pl-[0.8rem] underline font-bold" href="/signup">
          Sign-up
        </Link>
      </p>
    </div>
  );
}
