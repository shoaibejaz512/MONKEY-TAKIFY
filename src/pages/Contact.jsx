import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFirebase } from '../context/FirebaseAuthContext'
import { toast } from 'react-toastify'


const Contact = () => {
  const [sendInfo, setsendInfo] = useState(false);
  const [firstName, setfirstName] = useState("")
  const [LastName, setLastName] = useState("");
  const [number, setnumber] = useState("");
  const [country, setcountry] = useState("");
  const [description, setdescription] = useState("");
  const firebase =  useFirebase();


  const handleSendInformation = async() => {
    if(!firstName || !LastName || !description || !country || !number){
      toast.error("all fields are required")
      return;
    }
    setsendInfo(true);
     const result = await firebase.contactInfo(firstName,LastName,number,country,description);
     toast.success("informatin send successfully")
     setsendInfo(false);
    setLastName("")
    setcountry("")
    setdescription("")
    setnumber("")
    setfirstName("")
  }

  return (
    <div>
        <Navbar/>
       <div className="main-contact-container w-full rounded-md    h-screen bg-zinc-50 flex flex-col justify-center items-center">
        <div className="container shadow-2xl shadow-zinc-300 rounded-lg bg-zinc-100 px-5 py-3" >
          <h2 className='text-center text-3xl text-black font-extrabold '>Contact Us</h2>
          <div className="inputs">
            <input 
            value={firstName} 
            onChange={(e) => setfirstName(e.target.value)}
            className=' w-[50%] px-5 py-2 text-2xl font-extrabold text-black outline-none border-3  border-black  rounded-lg mb-2 ' type="text" placeholder='First Name...'  />
            <input 
            value={LastName}
            onChange={(e) =>  setLastName(e.target.value)}
            className='w-[50%] px-5 py-2 text-2xl font-extrabold text-black outline-none border-3  border-black  rounded-lg mb-2 ' type="text" placeholder='Last Name...' /><br /><br />
            <input 
            value={number}
            onChange={(e) =>  setnumber(e.target.value)}
            className='w-[50%] px-5 py-2 text-2xl font-extrabold text-black outline-none border-3  border-black  rounded-lg mb-2 ' type="number" placeholder='Enter Phone Number...' />
            <input 
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            className='w-[50%] px-5 py-2 text-2xl font-extrabold text-black outline-none border-3  border-black  rounded-lg mb-2 ' type="text" placeholder='Enter Country'/>
          </div>
          <div className="textarea">
            <textarea 
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className=' px-5 py-2 text-2xl font-extrabold text-black outline-none border-3  border-black my-3 rounded-lg mb-2 ' name="feedback" rows={"10"} cols={"85"} placeholder='FeedBack'></textarea>
          </div>
          <p className='text-1xl font-bold text-black'>words : <strong>{description.split(" ").length}</strong> </p>
          <div className="send-btn">
            <button 
            onClick={handleSendInformation}
            disabled={sendInfo}
             className='w-full   bg-blue-600 text-white font-extrabold cursor-pointer py-3  rounded-lg hover:bg-blue-800 duration-300'>{sendInfo ? "Send Information...." : "Send Information"}</button>
          </div>
        </div>
       </div>
        <Footer/>
    </div>
  )
}

export default Contact