import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch} from "react-redux"
import { addAuth } from "../Store/Slices/Authslice";
import { useNavigate } from "react-router-dom";

const login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  let Dispatch = useDispatch()
  let Navigate = useNavigate()

  const Submit = async (data) => {
    toast.success("user login succesfully");
    console.log(data);
    let userdata = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post(`${import.meta.env.VITE_API_URL}/login`, userdata)
      .then((response) => {
        if (response.data) {
          toast.success("user login succesfully");
          console.log(response.data)
          Dispatch(addAuth(response.data))
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          Navigate("/")
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error("error :" + error.response.data.error);
          console.log(error)
          alert(error.response.data.message)
        }
      });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Toaster />
      <form
        onSubmit={handleSubmit(Submit)}
        className="border-[2px] text-center  border-black p-2"
      >
        <h2 className="font-bold text-xl">Login form</h2>
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
        <p>
          New user ?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            signup
          </Link>
        </p>
        <input
          type="submit"
          disabled={isSubmitting}
          value={"Login"}
          className="m-2 w-[80%] border-[1px] border-blue-700 bg-blue-700 hover:bg-white"
        />
      </form>
    </div>
  );
};

export default login;
