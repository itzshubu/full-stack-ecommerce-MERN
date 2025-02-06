import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const Submit = async (data) => {
    console.log(data);
    let userdata = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:3000/login", userdata)
      .then((response) => {
        if (response.data) {
          // toast.success("user login succesfully");
        }
        alert(response.data.message)
        // localStorage.setItem("ChatApp", JSON.stringify(response.data));
      })
      .catch((error) => {
        if (error.response) {
          // toast.error("error :" + error.response.data.error);
          console.log(error)
          alert(error.response.data.message)
        }
      });
  };

  return (
    <div className="flex h-screen justify-center items-center">
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
