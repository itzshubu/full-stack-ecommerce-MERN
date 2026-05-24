import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../config/apiClient.js";
import { logout } from "../Store/Slices/Authslice";
import { clearCart } from "../Store/Slices/CartSlice";

export const useLogoutConfirm = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openLogoutConfirm = () => setShowLogoutModal(true);
  const closeLogoutConfirm = () => {
    if (!isLoggingOut) setShowLogoutModal(false);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient.post("/logout");
    } catch {
      // still clear client state if server unreachable
    }
    dispatch(clearCart());
    dispatch(logout());
    setShowLogoutModal(false);
    setIsLoggingOut(false);
    navigate("/login");
  };

  return {
    showLogoutModal,
    isLoggingOut,
    openLogoutConfirm,
    closeLogoutConfirm,
    confirmLogout,
  };
};
