import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Imge from "../assets/profileimg.jpeg"
import { useFirebase } from "../context/FirebaseAuthContext"
import { IdCardLanyard, LayoutList, Settings, Pen } from "lucide-react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { Howl } from 'howler'
import Sound from "../assets/sound2.wav"


const Sidebar = () => {
    const [isAdmin, setisAdmin] = useState(false);
    const firebase = useFirebase();
    const [userData, setuserData] = useState(null)

    // Create Howl instance for click sound
    const clickSfx = new Howl({
        src: [Sound],
        volume: 1,
    });

    const playClickSound = () => {
        clickSfx.play();
    };

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                if (!firebase.user) {
                    setisAdmin(false);
                    setuserData(null);
                    return;
                }

                const q = query(
                    collection(firebase.db, "users"),
                    where("uid", "==", firebase.user.uid)
                );

                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const data = snapshot.docs[0].data();
                    setuserData(data);
                    setisAdmin(data.isAdmin === true);
                    console.log("User:", data.name, "| isAdmin:", data.isAdmin);
                } else {
                    setisAdmin(false);
                    setuserData(null);
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                setisAdmin(false);
                setuserData(null);
            }
        };

        checkAdminStatus();
    }, [firebase.user, firebase.db]);
    return (
        <>
            <div className="left-sidebar fixed top-0  border-r-2 border-white left-0 w-[25%] h-screen text-white bg-[#01013A] overflow-hidden flex flex-col  gap-10 items-center">
                <div className="user-img-logo flex gap-3 justify-between items-center py-3 px-2">
                    <img
                        src={userData?.photo || Imge}
                        width="50px"
                        alt="User Profile"
                        className='rounded-full border-2 border-white'
                    />

                    <h4 className='admin-logo'>{userData?.name || "User"}</h4>
                </div>
                <div className="sidebar-nav w-full">
                    <ul className='flex flex-col justify-start w-full items-start gap-2'>
                        <li  onClick={playClickSound}  className="list-none  w-[300px] px-2 bg-[#acacac1e] cursor-pointer hover:bg-[#acacac47] duration-300">
                            <NavLink to={isAdmin ? "/admin-task" : "/employee-task"} className="link-color text-decoration-none  text-2xl font-extrabold flex  justify-start gap-2 items-center"><LayoutList /> Your Task</NavLink>
                        </li>
                        {isAdmin && (
                            <li  onClick={playClickSound}  className="list-none w-[300px] px-2  bg-[#acacac1d] cursor-pointer hover:bg-[#acacac47] duration-300">
                                <NavLink to="/employee-task" className="link-color text-decoration-none text-2xl font-extrabold flex justify-start gap-2 items-center">
                                    <IdCardLanyard /> Employee Task
                                </NavLink>
                            </li>
                        )}
                        <li  onClick={playClickSound}  className="list-none w-[300px] px-2 bg-[#acacac20] cursor-pointer hover:bg-[#acacac48] duration-300">
                            <NavLink className="link-color text-decoration-none  text-2xl font-extrabold flex  justify-start gap-2 items-center" to={"/setting"}> <Settings /> Setting</NavLink>
                        </li>
                        <li  onClick={playClickSound}  className="list-none w-[300px] px-2 bg-[#acacac20] cursor-pointer hover:bg-[#acacac48] duration-300">
                            <NavLink to={isAdmin ? "/admin-dashboard" : "/employee-dashboard"} className="link-color text-decoration-none  text-2xl font-extrabold flex  justify-start gap-2 items-center"> <Pen /> Create Task</NavLink>
                        </li>
                        <li   onClick={playClickSound} className="list-none w-[300px] px-2 bg-[#acacac20] cursor-pointer hover:bg-[#acacac48] duration-300">
                            <NavLink to={isAdmin ? "/Admin-chart" : "/employee-chart"} className="link-color text-decoration-none  text-2xl font-extrabold flex  justify-start gap-2 items-center"> <Pen />Chart</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar