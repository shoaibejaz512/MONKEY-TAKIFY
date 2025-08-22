import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import img1 from "../assets/taskify.svg";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MoveRight } from 'lucide-react'
import Sound from "../assets/sound2.wav"

const Main = () => {



useEffect(() => {
  // Start marquee moving left by default
  gsap.to(".marquee", {
    x: "-100%",
    duration: 2.5,
    repeat: -1,
    ease: "none"
  });

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      // Scroll down → move left
      gsap.to(".marquee", {
        x: "-150%",
        duration: 2,
        repeat: -1,
        ease: "none"
      });
      gsap.to(".marquee .arrow-icon", {
        rotate: 0,
        duration: 0.2
      });
    } else {
      // Scroll up → move right
      gsap.to(".marquee", {
        x: "0%",
        duration: 2,
        repeat: -1,
        ease: "none"
      });
      gsap.to(".marquee .arrow-icon", {
        rotate: 180,
        duration: 0.8
      });
    }
  };

  window.addEventListener("wheel", handleWheel);

  return () => {
    window.removeEventListener("wheel", handleWheel);
  };
}, []);

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
    tl.from(".logo .title h2", {
      y: 150,
      duration: 1.2,
      opacity: 0,
      stagger: .2
    })
    tl.from(".logo  p", {
      opacity: 0,
      duration: .2,
    })

    tl.from(".img-container img", {
      x: 500,
      duration: .8,
      opacity: 0
    })
  })

  return (
    <>
      <div className="w-full main  h-screen gap-8   flex justify-center items-start  bg-[#03032F]">
        <div className="container  flex justify-center items-start h-[100%] gap-8 flex-col">
          <div className="logo w-[60%]">
            <h4 className='title mb-4 h-[100px]  '><h2 className='text-white font-extrabold text-[20px]'>Organize Your Tasks.</h2> <h2 className='text-white'>Simplify Your Life.</h2></h4>
            <p className=' text-white font-semibold '>Monkey Taskify helps you stay organized and boost productivity by making task management simple and intuitive. Whether you're working solo or with a team, you can easily create, track, and complete tasks — all in one place</p>
          </div>
          <div className="btn-container">
            <NavLink to="/register">
              <button onClick={playClickSound} className='w-[200px] hvr-wobble-to-top-right  overflow-hidden py-2 border-4 border-green-600 text-green-400 rounded-lg text-3xl font-extrabold cursor-pointer hover:bg-green-700 hover:text-white duration-200'>Register Now</button>
            </NavLink>
          </div>
        </div>
        <div className="img-container flex justify-center items-center h-[100%] ">
          <img src={img1} alt="" width="600px" />
        </div>
      </div>

      <div className="move">
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
        <div className="marquee flex-nowrap">
          <h4>Monkey Taskify</h4>
          <MoveRight className="arrow-icon  w-20 h-20 shrink-0   transition-colors duration-300" />
        </div>
      </div>
    </>
  )
}

export default Main