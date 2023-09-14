import React from "react";
import FooterLogoShineIcon from "../../lib/icons/FooterLogoShineIcon";
import FooterLogoIcon from "../../lib/icons/FooterLogoIcon";
import GitHubIcon from "../../lib/icons/GitHubIcon";
import TwitterIcon from "../../lib/icons/TwitterIcon";
import SupportUsIcon from "../../lib/icons/SupportUsIcon";

const Footer = () => {

  const currentYear = new Date().getFullYear().toString();

  return (
    <div className={"footer-container"}>
      <div className={"footer-description"}>
        <span>
          performed as part of a test case for the company
        </span>
      </div>
      <div className={"footer-logo-shine"}>
        <FooterLogoShineIcon/>
      </div>
      <div className={"footer-logo"}>
        <a href={"/"}>
          <FooterLogoIcon/>
        </a>
      </div>
      <div className={"footer-social"}>
        <div className={"footer-icon"}>
          <a href={"https://github.com/"} target={"_blank"}>
            <GitHubIcon/>
          </a>
        </div>
        <div className={"footer-icon"}>
          <a href={"https://twitter.com/"} target={"_blank"}>
            <TwitterIcon/>
          </a>
        </div>
        <div className={"footer-icon"}>
          <a href={"https://savelife.in.ua/"} target={"_blank"}>
            <SupportUsIcon/>
          </a>
        </div>
      </div>
      <span className={"footer-date"}>
        {currentYear}
      </span>
    </div>
  )
}

export default Footer;
