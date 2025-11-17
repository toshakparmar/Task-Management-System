"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

/**
 * Component to display individual task details with actions to edit, delete, and toggle status
 * @param task Task data
 * @param onEdit Function to edit the task
 * @param onDelete Function to delete the task
 * @param onToggle Function to toggle the task status
 */
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const priorityColors = {
    low: "text-gray-600 bg-gray-100",
    medium: "text-orange-600 bg-orange-50",
    high: "text-red-600 bg-red-50",
  };

  return (
    <div className="card p-6 hover:shadow-xl transition-shadow h-full flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 truncate">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 text-sm mt-2 max-h-16 overflow-hidden">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-sm font-semibold inline-flex items-center ${
            statusColors[task.status]
          }`}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center flex-wrap gap-3 text-sm">
          <span
            className={`inline-flex items-center text-sm font-medium px-3 py-1 rounded ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority.toUpperCase()} Priority
          </span>

          {task.dueDate && (
            <span className="text-gray-500 text-sm">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
          <Button
            onClick={() => onToggle(task.id)}
            variant="primary"
            className="px-3 py-1 text-sm"
          >
            Toggle
          </Button>

          <Button
            onClick={() => onEdit(task)}
            variant="secondary"
            className="px-3 py-1 text-sm"
          >
            Edit
          </Button>

          <Button
            onClick={() => onDelete(task.id)}
            variant="danger"
            className="px-3 py-1 text-sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
