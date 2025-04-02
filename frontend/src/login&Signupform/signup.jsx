import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


// console.log(useAuth())
const signup = () => {
  const [email,setEmail] = useState("")
  const [isOtpsend , setIsotpsend] = useState(false)
  const [isOptsending , setisoptsending] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");
  const emaill = watch("email")

  const Submit = async (data) => {
    console.log(data);
  
    // console.log(newuser)
    // return
    await axios
      .post(`${import.meta.env.VITE_API_URL}/signup`,data)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message)
        if (response.data) {
          toast.success("signup succesfully");
        }
        localStorage.setItem('ChatApp',JSON.stringify(response.data))
      })
      .catch((error) => {
        if(error.response){
          console.log(error)
          alert(error.response.data.message)
          // toast.error("error :" + error.response.data.error)
        }
      });
  };

  // function getemail(e){
  //   console.log(e.target.value)
  //       setEmail(e.target.value)
  // }
  // console.log(email)

 async function reqtootp(){
  console.log(emaill)
  let h = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if(!h.test(emaill) || !emaill){
       toast.error("please enter valid email") 
       alert("please enter valid email")
       console.log("hsdjkf")      
       return
  }
  
  setisoptsending(true)
    let response = await fetch("http://localhost:3000/send-otp",{
      method:"POST",
    headers : {
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email : emaill , hhhello : "uroiewui"})
    })
    let data = await response.json()
    console.log(data)
    if(response.ok){
      setIsotpsend(true)
       toast.success(data.message)
    }else{
      toast.error(data.message)
    }
    setisoptsending(false)
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Toaster />
      <form
        onSubmit={handleSubmit(Submit)}
        className="border-[2px] text-center  border-black p-2"
      >
        <h2 className="font-bold text-[30px]">signup form</h2>
        <div className="p-2">
          <input
            placeholder="fullName"
            {...register("fullName", {
              required: { value: true, message: "username cannot be empty" },
            })}
          />
        </div>
        {errors.fullName && (
          <p className="bg-red-600">{errors.Username.message}</p>
        )}
        <div className="p-2">
          <input
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "email cannot be empty" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </div>
        {errors.email && <p className="bg-red-600">{errors.email.message}</p>}
        <div className="p-2">
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: { value: true, message: "password cannot be empty" },
              minLength: {
                value: 6,
                message: "minimun length of password is 6",
              },
              maxLength: {
                value: 10,
                message: "maximum length of password is 10",
              },
            })}
          />
        </div>
        {errors.password && (
          <p className="bg-red-600">{errors.password.message}</p>
        )}
        <div className="p-2">
          <input
            placeholder="confirmpassword"
            type="password"
            {...register("confirmpassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "password do not match",
            })}
          />
        </div>
        {errors.confirmpassword && (
          <p className="bg-red-600">{errors.confirmpassword.message}</p>
        )}
        {isOtpsend && <div className="p-2">
          <input
            placeholder="otp"
            type="text"
            {...register("otp", {
              required: "Please enter your otp",
            })}
          />
        </div>
      }
      {errors.otp && (
        <p className="bg-red-600">{errors.otp.message}</p>
      )}

        <p>
          Have an account ?{" "}
          <Link to="/login" className="text-blue-600 underline">login</Link>
        </p>
       {isOtpsend ? <input
          type="submit"
          // disabled={isOptsending}
          disabled={isSubmitting}
          className="m-2 w-[80%] border-[1px] border-blue-700 bg-blue-700 hover:bg-white"
        /> : <button type="button" disabled={isOptsending} className="m-2 w-[80%] border-[1px] border-blue-700 bg-blue-700 hover:bg-white" onClick={reqtootp}>{isOptsending?"otp sending....":'send otp'}</button>}
      </form>
    </div>
  );
};

export default signup;
