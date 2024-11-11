import React from "react";
import { TbBrandLinkedin } from "react-icons/tb";
import { Link } from "react-router-dom";

const Contact = ({ icon: Icon, name, href }) => {
  return (
    <Link
      className="flex items-center gap-x-2 w-fit bg-[#2F2F35] px-4 py-2 rounded-full text-sm text-white"
      to={href}
      target="_blank"
    >
      <Icon className="h-5 w-5"></Icon>
      <span>{name}</span>
    </Link>
  );
};

export default Contact;
