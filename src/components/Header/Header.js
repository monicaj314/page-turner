import React from "react";
import PrimaryToolBar from "./PrimaryToolBar";
import SecondaryToolBar from "./SecondaryToolBar";

const Header = props => {
  return (
    <div>
      <PrimaryToolBar {...props} />
      <SecondaryToolBar {...props} />
    </div>
  );
};

export default Header;
