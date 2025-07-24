import React from "react";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="flex w-[85%]  items-center mx-auto">
          <img
            src="/src/assets/ForgedTrivia.png"
            alt=""
            className="w-[4%]  my-5"
          />
          <h1 className="text-2xl font-sans font-black ml-5">ForgedTrivia</h1>
          <ul className="flex w-full justify-end items-center gap-10 mr-10">
            <li>About</li>
            <li>contact</li>
            <li>Services</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
