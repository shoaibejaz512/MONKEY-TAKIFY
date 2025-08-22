import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import { useFirebase } from '../context/FirebaseAuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sound from "../assets/sound2.wav"

const AdminTask = () => {
    const [adminTasks, setAdminTasks] = useState([]);
    const [isdeleted, setisdeleted] = useState(false);




    // Create Howl instance for click sound
        const clickSfx = new Howl({
            src: [Sound],
            volume: 0.5,
        });
    
        const playClickSound = () => {
            clickSfx.play();
        };


    const firebase = useFirebase();
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const task = await firebase.getAdminTasks();
                setAdminTasks(task);
            } catch (error) {
                console.error("Error fetching admin tasks:", error);
            }
        };

        fetchTasks();
    }, [])


    //handlecompleted features
    const handleCompletedAdmin = async (taskid) => {
        const result = await firebase.handleComptedForAdmin(taskid);
        if (result) {
            toast.success("task completed successfully:)");
            setAdminTasks(prev =>
                prev.map(task =>
                    task.id === taskid
                        ? { ...task, taskCompleted: true, taskFailed: false }
                        : task
                )
            );
        } 
    }
    //handlec failed features
    const handleFailedtedAdmin = async (taskid) => {
        const result = await firebase.handleFailedForAdmin(taskid);
        if (result) {
            toast.error("Task failed sorry :( :( :(");
            setAdminTasks(prev =>
                prev.map(task =>
                    task.id === taskid
                        ? { ...task, taskFailed: true, taskCompleted: false }
                        : task
                )
            );
        }

        
    };

const handleRmeoveTask = async (taskId) => {
  setisdeleted(true);
  try {
    const result = await firebase.deletedAdminTask(taskId);
    if (result) {
      toast.success("Task deleted successfully!");
      setAdminTasks(prev => prev.filter(task => task.id !== taskId));
    } else {
      toast.error("Failed to delete task!");
    }
  } catch (error) {
    toast.error("Error deleting task!");
  } finally {
    setisdeleted(false); // always hide loader
  }
};

const navigate = useNavigate();
const handleUpdateTask = async(taskid) => {   
    const task = adminTasks.find((task) => task.id === taskid);
    if(task){
        navigate("/admin-dashboard",{state:{task}})
    }else{
        alert("task not found please try again");
    }
    
}
    return (
        <>
        {isdeleted && <div className='w-full h-screen z-[19999] fixed inset-0 bg-[#00000080] flex justify-center items-center'>
            <div className="deleted-loading w-[100px] h-[100px] rounded-[50%] border-4 border-t-white animate-spin">
            </div>
            </div>}
            <Sidebar />
            <div className='task-container w-[75%]  absolute top-0 right-0  flex flex-col gap-10 bg-[#0D0D71]'>
                {adminTasks.length === 0 ? (
                    <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl text-white'>NO Task Found ?? </p>
                ) : (
                    adminTasks.map((task) => {
                        return (
                            <div key={task.id} className="task-card w-full h-[300px] " style={{
                                background: "linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))",
                            }}>

                                <div className="task-header w-full flex justify-between items-center">
                                    <h4 >{task.taskTitle || "No title"}</h4>

                                    {(task.taskCompleted || task.taskFailed) && (
                                        <h5
                                            className={`
                                                    w-[200px]  rounded-[50px] border-violet-600 border-4  text-white flex justify-center items-center absolute left-[50%] mt-2 font-extrabold  py-2 px-2 `}
                                        >
                                            {task.taskCompleted
                                                ? "Task Completed   ✅"
                                                : "Task Failed   ❌"}
                                        </h5>
                                    )}
                                    <p className='bg-violet-600 text-white'>  {task.taskDate || "No date"}</p>
                                </div>
                                <div className="task-description">
                                    <p hvr-wobble-to-top-right >{task.taskDescription || "No description provided"}</p>
                                </div>
                                <div className="task-status ">
                                    <button  disabled={task.taskCompleted || task.taskFailed} onClick={() => {
                                        handleCompletedAdmin(task.id);
                                        playClickSound()
                                    }} className={`border-3 hvr-wobble-to-top-right  border-violet-700 text-violet-500 hover:bg-violet-700 hover:text-white duration-300 ${(task.taskCompleted || task.taskFailed) && "cursor-not-allowed" }`}>Completed</button>
                                    <button  disabled={task.taskCompleted || task.taskFailed} onClick={() => {
                                        handleFailedtedAdmin(task.id);
                                        playClickSound();
                                    }} className={`border-3 hvr-wobble-to-top-right  border-violet-700 text-violet-500 hover:bg-violet-700 hover:text-white duration-300 ${(task.taskCompleted || task.taskFailed) && "cursor-not-allowed" }`}>Failed</button>
                                    <button  onClick={() =>  {
                                        handleRmeoveTask(task.id);
                                        playClickSound()
                                        }} className='border-3 border-violet-700 text-violet-500 hover:bg-violet-700 hvr-wobble-to-top-right  hover:text-white duration-300'>Remove</button>
                                    <button  onClick={() => {
                                        handleUpdateTask(task.id)
                                        playClickSound()
                                    }} className='border-3 border-violet-700 text-violet-500 hover:bg-violet-700 hvr-wobble-to-top-right  hover:text-white duration-300'>Update</button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </>
    );
};

export default AdminTask;
