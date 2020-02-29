import * as React from "react";
import slackyImg from "../../../assets/slacky-icon.png";
import "./title.css";

export const Title = React.memo(() => (
  <div className="wrapTitle">
    <div>
      <h1>SLACKY</h1>
    </div>
    <img src={slackyImg} alt="slacky-icon" />
  </div>
));
