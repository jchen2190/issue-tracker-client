import React from "react";
// import "./Spinner.css";
// import "./Spinner-ring.css";
import "./Spinner-dual-ring.css";

function Spinner() {
  // return <div className="loader">Loading...</div>;
  // return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>;
  return (
    <div className="row">
      <div className="lds-dual-ring"></div> <div>Please wait for Server Connection</div>
    </div>
  );
}

export default Spinner;