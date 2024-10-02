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
      <div>
        <div onClick={() => setIsActive(!isActive)}>
          <div>
            {showOptions && <input type="checkbox" />}
            {title}
            {isActive ? "-" : "+"}
          </div>
        </div>
        {isActive && <div>{content}</div>}
      </div>
    </>
  );
}
