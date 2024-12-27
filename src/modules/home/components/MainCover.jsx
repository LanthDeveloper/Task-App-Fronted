import React, { useState, useEffect } from "react";
import "./MainCover.css";
import { Button } from "@nextui-org/react";
import {
  ExpressJsIcon,
  FigmaIcon,
  NextUiIcon,
  NextUiLogoIcon,
  NodeJsIcon,
  ReactIcon,
  SupabaseIcon,
  TailwindIcon,
  VercelIcon,
} from "../../shared/components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/useAuthStore";
import "animate.css";

const MainCover = () => {
  const navigate = useNavigate();
  const { session, userData } = useAuthStore();
  return (
    <div className="main-cover-box pb-12 overflow-hidden	">
      <div className="h-full flex flex-col gap-6 justify-center max-sm:justify-normal">
        <div className="main-cover-box--header animate__animated animate__fadeInLeft overflow-hidden	">
          <h2>
            Haz que cada <span>día</span> cuente
          </h2>
          <h3>de metas a realidades</h3>
        </div>
        <p className="text-center mx-auto max-w-xl text-2xl max-md:text-lg max-sm:text-md max-md:text-left   overflow-hidden	">
          Gestiona tus tareas de forma inteligente: Convierte tus pendientes en
          logros completados, con un sistema que se adapta a tu ritmo y estilo
          de trabajo.
        </p>

        <div className="w-fit mx-auto max-sm:mx-0">
          <Button
            className="rounded-none bg-black text-white max-w-fit text-lg px-6 py-6"
            onPress={() => navigate(session ? "/dashboard" : "/login")}
          >
            Comenzar
          </Button>
        </div>

        <div className="w-full max-w-4xl mx-auto animate__animated animate__fadeInUp overflow-hidden	">
          <div className="flex flex-wrap gap-4 items-center justify-center relative">
            <div className="w-[150px] h-[60px] relative">
              <NodeJsIcon className="w-32 absolute-center" />
            </div>

            <div className="w-[150px] h-[60px]  relative">
              <FigmaIcon className="w-24 mt-2 absolute-center" />
            </div>

            <div className="w-[150px] h-[60px]  relative">
              <VercelIcon className="w-28 mt-2 absolute-center" />
            </div>

            <div className="flex items-center gap-2 mt-3 h-full max-h-[70px]">
              <ReactIcon className="w-12" />
              <h3 className="text-2xl">React</h3>
            </div>

            <div className="flex items-center gap-2 mt-3 h-full max-h-[70px]">
              <SupabaseIcon className="w-10" />
              <h3 className="text-2xl">Supabase</h3>
            </div>

            <div className="flex items-center gap-2 mt-3 h-full max-h-[70px]">
              <TailwindIcon className="w-11" />
              <h3 className="text-2xl">Tailwind</h3>
            </div>

            <div className="w-[150px] h-[60px]  relative">
              <ExpressJsIcon className="w-24 mt-2 absolute-center" />
            </div>

            <div className="flex items-center gap-3 mt-3 h-full max-h-[70px]">
              <NextUiLogoIcon className="w-8" />
              <NextUiIcon className="w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCover;
