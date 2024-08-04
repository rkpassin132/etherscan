import React from "react";
import Image from "next/image";
import {
  TiSocialLinkedin,
  TiSocialGithub,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "../styles/footer.module.css";
import footerLogo from "../public/footerLogo.png";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer__box}>
        <Image className={Style.img} src={footerLogo} alt="logo" />
      </div>


      <div className={Style.footer__box}>
        <div className={Style.social}>
          <a href="https://www.linkedin.com/in/rahul-kumar-392a17196/" target="_blank"><TiSocialLinkedin /></a>
          <a href="https://github.com/rkpassin132/" target="_blank"><TiSocialGithub /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;