import React, { useState, useEffect } from 'react'
import Imge from "../assets/shaoib.png"
import { NavLink, useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/FirebaseAuthContext'
import { toast } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import { useLocation } from 'react-router-dom'

const EmployeeDashboard = () => {
    const location = useLocation();
    const taskData = location.state?.task;
    const [title, settitle] = useState("");
    const [date, setdate] = useState('')
    const [description, setdescription] = useState("");
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const firebase = useFirebase()


    useEffect(() => {
          if(!firebase.user){
            toast.error("Create Account First PLease ")
            return navigate("/register")
          }
        }, [firebase])



    useEffect(() => {
        if (taskData) {
            settitle(taskData.taskTitle || "");
            setdate(taskData.taskDate || "");
            setdescription(taskData.taskDescription || "");
        }
    }, [taskData]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !date || !description) return toast.error("all fields are reauired ok");





        try {
            setloading(true)

            if (taskData) {
                // ✅ Agar update ke liye aaya hai
                const updatedData = {
                    taskTitle: title,
                    taskDate: date,
                    taskDescription: description,
                };

                await firebase.updateEmployeeTask(taskData.id, updatedData);
                toast.success("Task Updated Successfully ✅");
            } else {
                // ✅ Naya task banane ke liye
                await firebase.employeeTasks(title, date, description);
                toast.success("Task Created Successfully 🎉");
            }

            // Reset
            settitle("");
            setdate("");
            setdescription("");

            navigate("/employee-task");
        } catch (error) {
            toast.error("Failed to save task ❌");
            console.error(error);
        } finally {
            setLoading(false);
        }


        // const result = firebase.employeeTasks(title, date, description)
        // if (result) toast.success("Task Created Successfully");
        // setdate("")
        // setdescription("")
        // settitle("")
    }

    const handleLogout = () => {
        firebase.handleLogout()
        navigate("/")
    }

    return (
        <div className='flex relative w-full h-screen justify-center items-center gap-2'>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <Sidebar />
            <div className="right-sidebar absolute  top-0 right-0 w-[75%] h-screen bg-[#040247]">
                <div className="header border-b-2 border-white w-full h-[80px] bg-[#020139]">
                    <div className="logo  flex justify-between items-center  w-full h-full">
                        <NavLink to={"/"} className="text-decoration-none"> <h4 className=' font-extrabold hvr-wobble-to-top-right  text-white'>Monkey Taskify</h4></NavLink>
                        <button onClick={handleLogout} className='bg-violet-600 rounded-sm hvr-wobble-to-top-right  hover:bg-violet-800 duration-300'>LogOut</button>
                    </div>
                </div>
                <div className="form-container w-[100%] h-[100%]">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            className='w-[40%] px-5 py-3 mx-3 bg-transparent  border-4 border-green-600 text-white' type="text" placeholder='Enter Task Title here...' />
                        <input
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                            className='w-[40%] px-5 py-3  mx-3 bg-transparent border-4 border-green-600 text-white' type="Date" />
                        <br />
                        <textarea
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            placeholder='Enter  task Description...' cols={"80"} rows={"8"} className=' my-12  border-4 border-green-600 text-white bg-transparent'></textarea>
                        <button type='submit' className='bg-green-600 hvr-wobble-to-top-right  hover:bg-green-700 duration-300 font-extrabold mx-3'>{taskData ? "Update Task" : "Create Task"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDashboard