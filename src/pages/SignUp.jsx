import React, { useState } from 'react'
import {  useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import Img from "../assets/googlelogo.png"
import { useFirebase } from '../context/FirebaseAuthContext';
import {useNavigate, NavLink} from "react-router-dom"
import { toast } from 'react-toastify';
import { Howl } from 'howler';
import Sound from "../assets/sound4.wav"


const SignUp = () => {

   const firebase =  useFirebase();
   const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [isCreated, setIscreated] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const clickSfx = new Howl({
        src:[Sound],
        volume:.8
    })
    const playClickSound = () => {
        clickSfx.play()
    }
    

    const onSubmit = async (data) => {
        setShowAlert(false); // Hide alert if form is valid
        const username = data.username;
        const email = data.email;
        const password = data.password;
        //add info into firebase of user 
        setIscreated(true)
        const newUser = await firebase.CreateAccount(email,password,username);
        setIscreated(false)
        firebase.setUserInfor(newUser.user);
        firebase.realtimeUserData(username,password,email)
        if(newUser){
            navigate("/login");
            toast.success("account created Successfully!")
        }else{
            toast.error("Account not created!");
        }
        reset()
    };

   const handleGoogleAuth = async (e) => {
    const result = await firebase.GoogleLogin();

    await firebase.setUserInfor(result.user); // ✅ await this
    firebase.realtimeUserData(result.user.displayName, result.user.email);

    if (result) {
        toast.success("Account created successfully!");
        navigate("/login");
    }
}

    const onInvalid = (errors) => {
        setShowAlert(true); // Show alert when there are validation errors
    };

    // Extract error messages
    const errorMessages = Object.values(errors).map((err, index) => (
        <p key={index} className="mb-1">{err.message}</p>
    ));

    return (
        <div className=' w-full h-screen flex justify-center items-center bg-[linear-gradient(to_left,_rgb(29,78,216),_rgb(30,64,175),_rgb(17,24,39))]'>
            <NavLink to={"/"}>  <button onClick={playClickSound} className=' back text-2xl font-extrabold hvr-wobble-to-top-right   w-[100px] h-[50px] cursor-pointer  bg-green-400 absolute top-[8%] left-[5%]'>Back</button>  </NavLink>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='bg-[#1A2A80] border-2 border-white flex flex-col justify-center items-center  rounded shadow-md w-full h-[90%]  max-w-[40%]'>
                <h2 className="text-3xl  mb-5 text-center text-white font-extrabold">Sign Up</h2>

                {/* //Alert */}
                {showAlert && (
                    <Alert
                        variant="danger"
                        onClose={() => setShowAlert(false)}
                        dismissible
                        className="w-[80%]  text-sm font-extrabold"
                    >
                        {errorMessages}
                    </Alert>
                )}

                {/* Username */}
                <input
                    type='text'
                    placeholder='Enter Username'
                    className='w-[80%] px-5 mb-3 py-2 text-2xl font-bold text-black  rounded-1xl bg-white outline-none border-none'
                    {...register("username", {
                        required: "Username is required!",
                        minLength: { value: 8, message: "Username must be at least 8 characters" },
                        maxLength: { value: 10, message: "Username must be max 10 characters" }
                    })}
                />
                {/* {errors.username && <p className='text-red-500 text-sm mb-2'>{errors.username.message}</p>} */}

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
                    value={isCreated ? "Create Account...." : "Create Account"}
                    disabled={isCreated}
                    onClick={playClickSound}
                    className={`w-[80%] mt-4 bg-green-500 text-white hvr-wobble-to-top-right  py-2 rounded font-extrabold text-2xl hover:bg-green-700 transition duration-200 ${isCreated ? "bg-green-800":"bg-green-500"}`}
                />
                 <button  type='button' onClick={() => {
                    handleGoogleAuth();
                    playClickSound();
                 }} className='w-[80%] py-2  bg-blue-500 text-2xl font-bold flex justify-center items-center gap-3 cursor-pointer text-white mt-2 hover:bg-blue-700 duration-300'>
                    <img src={Img} width={"25px"}  alt="googleImg" />
                    SignIn With Google</button>
                <NavLink to="/Login" className={`text-decoration-none hvr-wobble-to-top-right  hover:text-shadow-white text-white mt-2 text-1xl font-semibold`}>Already  Have Account</NavLink>
            </form>
        </div>
    );
};

export default SignUp;
