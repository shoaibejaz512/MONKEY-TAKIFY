import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/FirebaseAuthContext';
import Img from "../assets/profileimg.jpeg"
import { collection, query, where, getDocs,updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";




const Setting = () => {
    const [file, setfile] = useState(null);
    const [username, setusername] = useState("");
    const [userData, setuserData] = useState(null)
    const [loading, setloading] = useState(false)
    const navigate  = useNavigate()
    const firebase = useFirebase()

    useEffect(() => {
        const fetchUser = async () => {

            if (!firebase.user) return;

            try {
                const q = query(
                    collection(firebase.db, "users"),
                    where("uid", "==", firebase.user.uid)
                );

                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    snapshot.forEach((doc) => {
                        const userdata = doc.data();
                        setuserData(userdata);
                    });
                }
            } catch (error) {
                console.log("user not found for setting", error);
            }
        };

        if (firebase.user?.uid) {
            fetchUser();
        }
    }, [firebase.user]);



   const updateHandle = async () => {
    setloading(true);
    let imageUrl = userData?.photo || "";

    try {
        // Upload to Cloudinary if file selected
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "Taskify"); // unsigned preset
            data.append("cloud_name", "diodllscr"); // your cloud name

            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/diodllscr/image/upload",
                data
            );
            imageUrl = res.data.secure_url;
        }

        // Save username + photoURL in Firestore
       const result =  await firebase.updateUserInfo(firebase.db, firebase.user.uid, username, imageUrl);
        console.log("Updated user info:", result);

        // Optional: instantly update local state so UI refreshes
        setuserData({ ...userData, name: username, photo: imageUrl });
        setusername(""); // clear input after update
        setfile(null);

    } catch (err) {
        toast.error("Update failed:");
    } finally {
        setloading(false); // ✅ always runs
        toast.success("update SucessFully!")
        if(userData.isAdmin){
            navigate("/admin-dashboard")
        }else{
            navigate("/employee-dashboard")
        }

    }
};



    return (
        <div className='w-full h-screen gap-12 flex flex-col justify-center items-center setting'>
            <div className="user-info flex justify-center items-center w-full gap-16">
                <img
                    src={userData?.photo || Img}
                    alt="profile"
                    className="w-24 h-24 object-cover rounded-full"
                />
                <h4>{userData?.name || "User"}</h4>
            </div>
            <input type="file" onChange={(e) => setfile(e.target.files[0])} />
            <input type="text" placeholder='enter your username' value={username} onChange={(e) => setusername(e.target.value)} />
            <button onClick={updateHandle} className={`bg-green-500 ${loading && "bg-green-800"} hover:bg-green-600 duration-200`}>{loading ? "Uploading....":"Upload"}</button>
        </div>
    )
}

export default Setting