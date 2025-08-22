import React from 'react'
import { NavLink } from 'react-router-dom'
import { Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className='footer-container w-full h-[100px] bg-[#010127] flex justify-between items-center'>
        <div className="main-content-footer container   flex justify-start gap-24 items-center">
          <div className="logo">
            <h4 className='text-white   font-extrabold'>Monkey Taskify</h4>
          </div>
          <div className="allpages flex  gap-3">
            <NavLink className="text-[18px] font-semibold hover:text-zinc-500 duration-200 text-white text-decoration-none" to={"/about"}>About</NavLink>
            <NavLink className="text-[18px] font-semibold hover:text-zinc-500 duration-200 text-white text-decoration-none" to={"/contact"}>Contact</NavLink>
            <NavLink className="text-[18px] font-semibold hover:text-zinc-500 duration-200 text-white text-decoration-none" to={"/"}>Home</NavLink>
            <NavLink className="text-[18px] font-semibold hover:text-zinc-500 duration-200 text-white text-decoration-none" to={"/service"}>Services</NavLink>
          </div>
        </div>
        <div className="socials-icons flex justify-center items-center px-5  gap-2">
          <NavLink to={"https://github.com/Shoaibejaz313"} target='_blank'><Github size={32} color="#fff" strokeWidth={1.5} /></NavLink>
          <NavLink to={"https://www.instagram.com/programming_wiht_rahi/"} target='_blank'><Instagram size={32} color="#fff" strokeWidth={1.5} /></NavLink>
          <NavLink to={"https://x.com/AmirHussai14427"} target='_blank'><Twitter size={32} color="#fff" strokeWidth={1.5} /></NavLink>
        </div>
      </div>
      <div className="copy-right w-full flex justify-center items-center py-4 bg-[#010127] border-t-2 border-white">
        <h5 className='text-white font-extrabold'>&copy; 2025 Shoabi Ejaz. All rights reserved.</h5>
      </div>
    </>
  )
}

export default Footer