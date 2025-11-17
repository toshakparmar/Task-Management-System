"use client";

import React from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/**
 * Modal component for displaying task details or forms
 * @param isOpen Whether the modal is open
 * @param onClose Function to close the modal
 * @param title Modal title
 * @param children Modal content
 */
export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-primary-600">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="text-gray-500 hover:text-gray-700 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
