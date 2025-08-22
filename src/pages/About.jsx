import React, { useEffect, useState,useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { ChevronUp } from "lucide-react";
import Sideanimated from "../components/Sideanimated.jsx";


const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const headingRef = useRef(null);
  
  

  const sections = [
    {
      title: "What is Taskify?",
      content: `Taskify is not just another to-do list.
      It is the discipline you’ve been avoiding, the order in the chaos.
      Every task you enter is a commitment — and Taskify remembers.
      Deadlines don’t whisper here; they loom.
      We strip away distractions, leaving only the work that must be done… 
      and the reminder that time is always running out.`,
    },
    {
      title: "Why choose Taskify?",
      content: `Because it turns productivity into precision. 
      No fluff, no excuses — just the structure you need 
      to face the work you’ve been avoiding.`,
    },
    {
      title: "Who is Taskify for?",
      content: `For those who want more than a checklist — 
      for those who demand results and refuse to waste time.`,
    },
    {
      title: "How does Taskify work?",
      content: `It tracks, reminds, and pushes you to act. 
      Every interaction is designed to keep you moving forward, 
      until the task is done.`,
    },
  ];

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
   <>
    <div>
      <Navbar />
      <div className="main-about-container w-full min-h-screen bg-[#03032F] text-white">
        <div className="container  mx-auto p-3 ">
          {sections.map((section, index) => (
            <div key={index} className="info-container">
              <div
                onClick={() => toggleSection(index)}
                className="inner-logo flex justify-between items-center border-2 py-4 px-6 cursor-pointer border-white"
              >
                <h1 className="text-xl font-bold">{section.title}</h1>
                <ChevronUp
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`inner-para  overflow-hidden transition-all duration-500 ${
                  activeIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="mt-4  text-gray-300">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Sideanimated/>
      <Footer />
   </>
  );
};

export default About;
