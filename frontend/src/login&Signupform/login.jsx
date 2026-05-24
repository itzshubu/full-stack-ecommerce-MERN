import apiClient from "../config/apiClient.js";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAuth } from "../Store/Slices/Authslice";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import LoadingButton from "../components/ui/LoadingButton";
import ScrollToTop from "../components/ScrollToTop";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Submit = async (data) => {
    try {
      const response = await apiClient.post("/login", data);
      if (response.data?.user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(addAuth({ user: response.data.user }));
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-950 px-4 py-10 transition-colors duration-300">
      <ScrollToTop />
      <Toaster position="top-center" />
      <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-3xl rotate-45 mainColor opacity-20" />
      <div className="absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-3xl rotate-12 bg-blue-300 dark:bg-blue-900 opacity-20" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <img
              src="/vite.svg"
              alt="ShopFlick"
              className="w-12 h-12 bg-white rounded-full p-2 shadow-md"
            />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              Shop<span className="textmainColor">Flick</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue shopping
          </p>
        </div>

        <form
          onSubmit={handleSubmit(Submit)}
          className="auth-card space-y-5"
        >
          <div className="text-center pb-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter your account details below
            </p>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="auth-input pl-10"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="auth-error">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="auth-input pl-10"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 6,
                    message: "Minimum password length is 6",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum password length is 10",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="auth-error">{errors.password.message}</p>
            )}
          </div>

          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="w-full py-3 rounded-lg shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </LoadingButton>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Fashion · Electronics · Jewelry — all in one place
        </p>
      </div>
    </div>
  );
};

export default Login;
