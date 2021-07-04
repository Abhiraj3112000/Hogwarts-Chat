import React from "react";
import "../App.css";
const Nav = () => {
  return (
    <header
      clasName="header"
      style={{ fontFamily: "Comic Sans MS", color: "#007bff" }}
    >
      <div>
        <h3>
          {" "}
          <img
            style={{ height: "30px", width: "30px" }}
            src="witch_hat.png"
            alt="witch_hat"
          />
          &nbsp; Hogwarts Chat
        </h3>
      </div>
    </header>
  );
};

export default Nav;
