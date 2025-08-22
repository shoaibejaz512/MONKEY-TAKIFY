import React, { useEffect, useState } from 'react'
import { Routes, Route,useLocation } from "react-router-dom"
import SignUp from './pages/SignUp'
import Login from "./pages/Login"
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import AdminDashborad from './pages/AdminDashborad'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AdminTask from "./pages/AdminTask"
import EmployeeTask from './pages/EmployeeTask'
import FeedBack from './pages/FeedBack'
import Lenis from 'lenis'
import EmployeeChart from './pages/EmployeeChart'
import AdminChart from './pages/AdminChar'
import Setting from './pages/Setting'

const App = () => {



  useEffect(() => {
    let lenis = new Lenis();
    // Listen for the scroll event and log the event data
    // lenis.on('scroll', (e) => {
    //   console.log(e);
    // });
    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);



  }, [])



  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/service' element={<Services />} />
      <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
      <Route path='/admin-dashboard' element={<AdminDashborad />} />
      <Route path='/admin-task' element={<AdminTask />} />
      <Route path='/employee-task' element={<EmployeeTask />} />
      <Route path='/clients-feedback' element={<FeedBack />} />
      <Route path='/employee-chart' element={<EmployeeChart />} />
      <Route path='/admin-chart' element={<AdminChart />} />
      <Route path='/setting' element={<Setting />} />
    </Routes>
  )
}

export default App
