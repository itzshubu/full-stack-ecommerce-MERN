import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// console.log(useAuth())
const signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const Submit = async (data) => {
    // console.log(data);
    let newuser = {
      fullname: data.username,
      email: data.email,
      password: data.password,
      confirmpass: data.confirmpassword,
    };
 
    console.log(newuser)
    await axios
      .post("https://full-stack-ecommerce-mern.onrender.com/signup", newuser)
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

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(Submit)}
        className="border-[2px] text-center  border-black p-2"
      >
        <h2 className="font-bold text-[30px]">signup form</h2>
        <div className="p-2">
          <input
            placeholder="Username"
            {...register("username", {
              required: { value: true, message: "username cannot be empty" },
            })}
          />
        </div>
        {errors.Username && (
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

        <p>
          Have an account ?{" "}
          <Link to="/login" className="text-blue-600 underline">login</Link>
        </p>
        <input
          type="submit"
          disabled={isSubmitting}
          className="m-2 w-[80%] border-[1px] border-blue-700 bg-blue-700 hover:bg-white"
        />
      </form>
    </div>
  );
};

export default signup;
