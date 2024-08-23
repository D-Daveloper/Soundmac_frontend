import { Copyright } from "lucide-react";
import React from "react";

const FooterComponent = () => {
  return (
    <footer className="grad">
      <div className="flex flex-wrap justify-between gap-5 p-6 text-white">
        <h3 className="flex gap-2 font-semibold">
          SoundMac
          <Copyright /> {new Date().getFullYear()}
        </h3>
        <div className="flex gap-2 capitalize">
          <p>terms & conditions</p>
          <p>policy</p>
        </div>
        <div className="flex gap-3">
          <a href="">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
