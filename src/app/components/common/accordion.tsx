"use client";
import { useState } from "react";

type Acronym = {
  title: string;
  content: string;
  showOptions?: boolean;
};

export default function Accordion({ title, content, showOptions }: Acronym) {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          {showOptions && (
            <input type="checkbox" id={title} name={title} className="hover:cursor-pointer" />
          )}
          <p className="float-left text-white font-bold">{title}</p>
          <p
            className="float-right hover:cursor-pointer"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "-" : "+"}
          </p>
        </div>
        {isActive && <div>{content}</div>}
      </div>
    </>
  );
}
