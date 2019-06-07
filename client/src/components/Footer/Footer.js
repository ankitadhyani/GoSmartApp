import React from "react";
import "./Footer.css";

function Footer() {
  
  return (

    <div className="row bg-info p-2 mt-3 fixed-bottom footer">

      <div className="col-12">
        Copyright &copy; {new Date().getFullYear()}
      </div>

    </div>

  );
}

export default Footer;
