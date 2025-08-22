import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useFirebase } from '../context/FirebaseAuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmployeeTask = () => {
  const [employeeTasks, setEmployeeTask] = useState([])
  const [loading, setLoading] = useState(true);
  const [isdeleted, setisdeleted] = useState(false);
  const firebase = useFirebase()
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const task = await firebase.getAllEmployeeTasks();
        setEmployeeTask(task);
      } catch (error) {
        console.error("Error fetching Employee tasks:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchTasks();
  }, [firebase])



  //handle completed 
  const handleCompletedEmployee = async (taskid) => {
    const result = await firebase.handleComptedForEmployee(taskid);
    if (result) {
      toast.success("Task completed successfully!");
      setEmployeeTask(prev =>
        prev.map(task =>
          task.id === taskid
            ? { ...task, taskCompleted: true, taskFailed: false }
            : task
        )
      );
    }
  };
  //handle completed 

  const handleFailedEmployee = async (taskid) => {
    const result = await firebase.handleFailedForEmployee(taskid);
    if (result) {
      toast.error("Task failed. Sorry :( :( :(");
      setEmployeeTask(prev =>
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
     const result = await firebase.deletedEmployeeTask(taskId);
     if (result) {
       toast.success("Task deleted successfully!");
       setEmployeeTask(prev => prev.filter(task => task.id !== taskId));
     } else {
       toast.error("Failed to delete task!");
     }
   } catch (error) {
     toast.error("Error deleting task!");
   } finally {
     setisdeleted(false); // always hide loader
   }
 };

const navigate = useNavigate()
 const handleUpdateTask = (taskid) => {
  const task = employeeTasks.find((task) => task.id === taskid);
  if(task){
    navigate("/employee-dashboard",{state:{task}})
  }
 }

  return (
    <>
    {isdeleted && <div className='w-full h-screen z-[19999] fixed inset-0 bg-[#00000080] flex justify-center items-center'>
            <div className="deleted-loading w-[100px] h-[100px] rounded-[50%] border-4 border-t-white animate-spin">
            </div>
            </div>}
    <div className='task-container w-[75%]  absolute top-0 right-0  flex flex-col gap-10 bg-[#0D0D71]'>
      <Sidebar />
      {loading ? (<p>Loading tasks...</p>) : employeeTasks.length === 0 ? (
        <p className='text-white text-[2rem] font-extrabold'>no employee task found</p>
      ) : (
        employeeTasks.map((task) => {
          return (
            <div key={task.id} className="task-card w-full h-[300px] " style={{
              background: "linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))",
            }}>
              <div className="task-header w-full flex justify-between items-center">
                <h4 >{task.taskTitle || "No title"}</h4>
                {(task.taskCompleted || task.taskFailed) && (
                  <h5
                    className={` 
                                                    w-[200px] rounded-[50px] border-violet-600 text-white border-4 flex justify-center items-center absolute left-[50%] font-extrabold  py-2 mt-2 `}
                  >
                    {task.taskCompleted
                      ? "Task Completed   ✅"
                      : "Task Failed   ❌"}
                  </h5>
                )}
                <p className='bg-violet-600 text-white'> {task.taskDate || "No date"}</p>
              </div>
              <div className="task-description">
                <p>{task.taskDescription || "No description provided"}</p>
              </div>
              <div className="task-status ">
                <button disabled={task.taskCompleted || task.taskFailed} onClick={() => handleCompletedEmployee(task.id)} className={`border-3 hvr-wobble-to-top-right  border-violet-700 text-violet-500 hover:bg-violet-700 hover:text-white duration-300 ${(task.taskCompleted || task.taskFailed) ? "cursor-alias" : "cursor-pointer"}`}>Completed</button>
                <button disabled={task.taskCompleted || task.taskFailed} onClick={() => handleFailedEmployee(task.id)} className={`border-3 hvr-wobble-to-top-right  border-violet-700 text-violet-500 hover:bg-violet-700 hover:text-white duration-300 ${(task.taskCompleted || task.taskFailed) ? "cursor-alias" : "cursor-pointer"}`}>Failed</button>
                <button onClick={(() => handleRmeoveTask(task.id))} className={`border-3 border-violet-700 text-violet-500 hover:bg-violet-700 hover:text-white hvr-wobble-to-top-right  duration-300 `}>Remove</button>
                <button onClick={() => handleUpdateTask(task.id)} className={`border-3 border-violet-700 text-violet-500 hover:bg-violet-700 hover:text-white hvr-wobble-to-top-right  duration-300 `}>Update</button>
              </div>
            </div>
          )
        })
      )}
    </div>
    </>
  )
}

export default EmployeeTask