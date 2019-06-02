import React from "react";
import "./Footer.css";

function Footer() {
  
  return (

    <div className="row bg-info p-2 mb-1 mt-3 footer">

      <div className="col-12">
        Copyright &copy; {new Date().getFullYear()}
      </div>

    </div>

  );
}

export default Footer;
