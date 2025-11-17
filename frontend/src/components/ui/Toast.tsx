"use client";

import React from "react";
import { Toast as ToastType } from "@/lib/hooks/useToast";

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

/** 
 * Toast notification component
 * @param toast The toast data
 * @param onClose Function to close the toast
 */
export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-primary-600",
  }[toast.type];

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-start gap-4 min-w-[280px] animate-slide-in`}
      role="status"
    >
      <div className="flex-1">
        <p className="text-sm">{toast.message}</p>
      </div>

      <button
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
        className="ml-2 text-white hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
      >
        ✕
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};
