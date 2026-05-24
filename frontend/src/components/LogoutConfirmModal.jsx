import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdOutlineLogout } from "react-icons/md";
import LoadingButton from "./ui/LoadingButton";

const LogoutConfirmModal = ({ open, onCancel, onConfirm, loading = false }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="confirm-overlay"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="auth-card confirm-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <div className="flex justify-center mb-4">
          <span className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
            <MdOutlineLogout className="text-3xl text-red-600 dark:text-red-400" />
          </span>
        </div>

        <h2
          id="logout-title"
          className="text-xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Log out?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          You will need to sign in again to access your cart and profile.
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn2 flex-1 sm:flex-none disabled:opacity-60"
          >
            Cancel
          </button>
          <LoadingButton
            type="button"
            variant="danger"
            loading={loading}
            onClick={onConfirm}
            className="flex-1 sm:flex-none"
          >
            {loading ? "Logging out..." : "Yes, Logout"}
          </LoadingButton>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutConfirmModal;
