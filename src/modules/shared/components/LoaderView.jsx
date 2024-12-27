import React, { useState, useEffect } from "react";
import { LoaderSVG } from "./Icons";

const LoaderView = () => {
  return (
    <div className="grid place-items-center w-full h-full min-h-[16rem]">
      <LoaderSVG className="w-20"/>
    </div>
  );
};

export default LoaderView;
