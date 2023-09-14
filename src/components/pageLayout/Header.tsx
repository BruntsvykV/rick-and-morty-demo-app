import React from "react";
import HeaderLogoIcon from "../../lib/icons/HeaderLogoIcon";
import HeaderLogoBgIcon from "../../lib/icons/HeaderLogoBgIcon";

const Header = () => {

  return (
    <div className={"header-container"}>
      <div className={"header-nav"}>
        <a className={"header-logo"} href={"/"}>
          <HeaderLogoIcon/>
        </a>
      </div>
      <div className={"header-main"}>
        <span className={"header-main-description"}>
          The Rick and Morty API
        </span>
        <div className={"header-logo-bg"}>
          <HeaderLogoBgIcon/>
        </div>
      </div>
    </div>
  )
}

export default Header;
