import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { Howl } from "howler";

const Home = () => {
  const [welcome] = useState("Welcome To Monkey Taskify");
  const [newstr, setnewstr] = useState([]);
  const [finish, setfinish] = useState(false);

  // ✅ keep Howl in a ref
  const soundRef = useRef(null);

  // ✅ initialize sound
  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/musics/sound1.mp3"],
      volume: 0.8,
      html5: true,
      loop:false,
      onload: () => console.log("Sound loaded ✅"),
      onplayerror: () => {
        // retry after unlock
        soundRef.current.once("unlock", () => {
          soundRef.current.play();
        });
      },
    });

    const unlock = () => {
      if (soundRef.current && !soundRef.current.playing()) {
        soundRef.current.play();
      }
      window.removeEventListener("click", unlock);
    };

    window.addEventListener("click", unlock);

    return () => {
      window.removeEventListener("click", unlock);
    };
  }, []);

  // ✅ split text once
  useEffect(() => {
    setnewstr(welcome.split(""));
  }, [welcome]);

  // ✅ run animation only once per session
  useEffect(() => {
    if (newstr.length === 0) return;

    const animationPlayedBefore =
      sessionStorage.getItem("homeAnimationPlayed") === "true";

    if (!animationPlayedBefore) {
      let tl = gsap.timeline({
        onStart: () => {
          if (soundRef.current) {
            soundRef.current.play(); // 🔊 play at animation start
          }
        },
        onComplete: () => {
          setfinish(true);
        },
      });

      tl.fromTo(
        ".welcome-title span",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      tl.from(".bar-loading", { opacity: 0, duration: 0.4 });
      tl.to(".bar-loading .bar", { width: "100%", duration: 0.8 });
      tl.to(".welcome-box", { x: "100%", duration: 1.2 });

      tl.call(() => sessionStorage.setItem("homeAnimationPlayed", "true"));
    } else {
      setfinish(true);
    }
  }, [newstr]);

  return (
    <>
      {finish && <Navbar />}
      {finish && <Main />}
      {!finish && (
        <div
          className="welcome-box w-full h-screen fixed inset-0 flex justify-center items-center flex-col"
          style={{
            background:
              "linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
          }}
        >
          <div className="welcome-title">
            {newstr.map((str, index) => (
              <span key={index}>{str}</span>
            ))}
          </div>
          <div className="bar-loading">
            <div className="bar"></div>
          </div>
        </div>
      )}
      {finish && <Footer />}
    </>
  );
};

export default Home;
