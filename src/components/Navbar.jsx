import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useFirebase } from '../context/FirebaseAuthContext';
import { toast } from 'react-toastify';
import Sound from "../assets/sound2.wav"




const Navbar = () => {
  const [CheckUser, setCheckUser] = useState(false);
  const firebase = useFirebase()

  useEffect(() => {
    const isLogin = async () => {
      const isUser = await firebase.user;
      if (isUser) {
        setCheckUser(true);
      } else {
        setCheckUser(false)
      }
    }
    isLogin()
  }, [firebase])



  // Create Howl instance for click sound
  const clickSfx = new Howl({
    src: [Sound],
    volume: 1,
  });

  const playClickSound = () => {
    clickSfx.play();
  };

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".logo .main-heading", {
      y: -100,
      duration: .5,
      opacity: 0
    })
    tl.from("nav ul li ", {
      y: -100,
      duration: .5,
      stagger: .1
    })
  })

  return (
    <div className="nav-container  bg-[#010127] text-white  flex justify-start  h-[60px] items-center text-center px-5 gap-8 w-full">
      <div className="logo ">
        <h4 className='main-heading  font-extrabold '>Monkey Taskify</h4>
      </div>
      <nav >
        <ul className='flex justify-center items-center pt-3 gap-5'>
          <li onClick={playClickSound} className='list-style-none '><NavLink className={({ isActive }) =>
            `text-xl font-bold ${isActive ? 'text-white' : 'text-zinc-400'} text-decoration-none anchor`
          } to="/">Home</NavLink></li>
          <li onClick={playClickSound} className='list-style-none '><NavLink className={({ isActive }) =>
            `text-xl font-bold ${isActive ? 'text-white' : 'text-zinc-400'} text-decoration-none anchor`
          } to="/about">About</NavLink></li>
          <li onClick={playClickSound} className='list-style-none '><NavLink className={({ isActive }) =>
            `text-xl font-bold ${isActive ? 'text-white' : 'text-zinc-400'} text-decoration-none anchor`
          } to="/contact">Contact</NavLink></li>
          <li onClick={playClickSound} className='list-style-none '><NavLink className={({ isActive }) =>
            `text-xl font-bold ${isActive ? 'text-white' : 'text-zinc-400'} text-decoration-none anchor`
          } to="/service">Service</NavLink></li>
          <li onClick={playClickSound} className='list-style-none '><NavLink className={({ isActive }) =>
            `text-xl font-bold ${isActive ? 'text-white' : 'text-zinc-400'} text-decoration-none anchor`
          } to="/clients-feedback">FeedBack</NavLink></li>


          {CheckUser && (
            <li onClick={playClickSound} className='newlist Wobble hvr-wobble-vertical '>
              <NavLink to="/admin-dashboard" className={({ isActive }) =>
                `text-xl list-style-none font-bold ${isActive ? 'text-white' : 'text-zinc-400'}  text-decoration-none anchor`
              }>
                Go To Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

    </div>
  )
}

export default Navbar