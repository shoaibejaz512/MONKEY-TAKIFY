import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Calendar, BarChart3, Users, Zap, Shield } from "lucide-react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


const Services = () => {
  const services = [
    {
      title: "Task Management",
      description: "Organize, prioritize, and track tasks with ease to boost your productivity.",
      icon: CheckCircle
    },
    {
      title: "Smart Scheduling",
      description: "Plan your workdays with AI-assisted scheduling that adapts to your workflow.",
      icon: Calendar
    },
    {
      title: "Progress Analytics",
      description: "Gain insights with visual reports to track your team's performance over time.",
      icon: BarChart3
    },
    {
      title: "Team Collaboration",
      description: "Collaborate in real time with teammates and keep everyone on the same page.",
      icon: Users
    },
    {
      title: "Fast & Responsive",
      description: "Lightning-fast performance so you can focus on your work, not loading screens.",
      icon: Zap
    },
    {
      title: "Data Security",
      description: "Your data is encrypted and protected with enterprise-grade security.",
      icon: Shield
    }
  ];

 
  useGSAP(() => {
    let tl = gsap.timeline();
     tl.from(".service-heading",{
      y:300,
      duration:.8,
      opacity:0
    })
    tl.from(".service-card",{
      opacity:0,
      duration:.8,
      stagger:.1
    })
   
  })

  return (
    <div>
      <Navbar />

      {/* Services Section */}
      <section className="min-h-screen bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <div className='service-span'><h1 className="text-4xl service-heading font-bold text-gray-900 mb-4">Our Services</h1></div>
          <p className="text-lg text-gray-600">
            Everything you need to manage tasks, boost productivity, and collaborate effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white service-card rounded-2xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      
      <Footer />
    </div>
  );
};

export default Services;
