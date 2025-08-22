import React, { useEffect } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Sideanimated = () => {
    useEffect(() => {
   const anim =   gsap.to(".animated-heading h1",{
        xPercent:-280,
        duration:2.5,
        scrollTrigger:{
            trigger:".animated-heading",
            scroller:"body",
            start:"top 0%",
            end:"top -300%",
            scrub:true,
            pin:true
        }
     })

       return () => {
            anim.scrollTrigger?.kill(); // scrollTrigger remove kare
            anim.kill(); // gsap animation remove kare
        };
    }, [])
    
  return (
    <div className='main-animated-heading'>
        <div className="animated-heading">
            <h1>MONKEY TASKIFY</h1>
        </div>
    </div>
  )
}

export default Sideanimated