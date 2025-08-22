import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useFirebase } from '../context/FirebaseAuthContext';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Howl } from 'howler';
import Sound from "../assets/sound3.wav"



const Login = () => {

    const [isLogin, setIsLogin] = useState(false)
    const firebase = useFirebase();
    const navigate = useNavigate()


    const clickSfx = new Howl({
        src:[Sound],
        volume:.8
    })

    const playClickSound = () => {
        clickSfx.play()
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const onSubmit = async ({ email, password }) => {
        setIsLogin(true);

        try {
            // Step 1: Try login
            const user = await firebase.LoginAccount(email, password);
            console.log("user login", user);

            if (user) {
                toast.success("Login Success");

                // Step 2: Fetch user-specific document by UID
                const snapshot = await firebase.getDocsFromFirestore(user.uid);

                if (!snapshot.empty) {
                    // pick the first matching document
                    const userData = snapshot.docs[0].data();

                    if (userData.isAdmin) {
                        navigate("/admin-dashboard");
                    } else {
                        navigate("/employee-dashboard");
                    }
                } else {
                    toast.error("No user profile found.");
                }

                reset(); // ✅ clear only after successful login
            }
        } catch (error) {
            toast.error("Invalid credentials, try again");
            console.error(error);
        } finally {
            setIsLogin(false);
        }
    };

    return (
        <div className=' w-full h-screen flex justify-center items-center bg-[linear-gradient(to_left,_rgb(29,78,216),_rgb(30,64,175),_rgb(17,24,39))]'>
            <NavLink to={"/register"}>  <button onClick={playClickSound} className=' back text-2xl hvr-wobble-to-top-right  font-extrabold  w-[100px] h-[50px] cursor-pointer  bg-green-400 absolute top-[8%] left-[5%]'>Back</button>  </NavLink>

            <form onSubmit={handleSubmit(onSubmit)} className='bg-[#1A2A80] border-2 border-white flex flex-col justify-center items-center  rounded shadow-md w-full h-[60%]  max-w-[40%]'>
                <h2 className="text-3xl  mb-5 text-center text-white font-extrabold">Login</h2>

                {/* Password */}
                <input
                    type='password'
                    placeholder='Enter Password'
                    className='w-[80%] px-5 mb-3 py-2  text-2xl font-bold text-black rounded-1xl bg-white outline-none border-none'
                    {...register("password", {
                        required: "Password is required!",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                        maxLength: { value: 10, message: "Password must be max 10 characters" }
                    })}
                />
                {/* {errors.password && <p className='text-red-500 text-sm mb-2'>{errors.password.message}</p>} */}

                {/* Email */}
                <input
                    type='email'
                    placeholder='Enter Email'
                    className='w-[80%] px-5 mb-3 py-2 text-2xl font-bold text-black rounded-1xl bg-white outline-none border-none'

                    {...register("email", {
                        required: "Email is required!",
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Invalid email format"
                        }
                    })}
                />
                {/* {errors.email && <p className='text-red-500 text-sm mb-2'>{errors.email.message}</p>} */}

                {/* Submit Button */}
                <input
                    type="submit"
                    value={isLogin ? "login..." : "login"}
                    disabled={isLogin}
                    onClick={playClickSound}
                    className={`w-[80%] mt-4 text-white py-2 rounded font-extrabold text-2xl hvr-wobble-to-top-right  hover:bg-green-700 transition duration-200 ${isLogin ? "bg-green-800" : " bg-green-500"}`}
                />

                <NavLink to="/register" className='text-decoration-none hvr-wobble-to-top-right  text-white mt-2 text-1xl font-semibold'>Don,t  Have Account create account</NavLink>
            </form>
        </div>
    )
}

export default Login