"use client";

import React, { useState, useCallback } from "react";
import { Task } from "@/types";
import { TaskItem } from "./TaskItem";
import { TaskModal } from "./TaskModal";
import { TaskForm } from "./TaskForm";
import { TaskFilters } from "./TaskFilters";
import { Button } from "@/components/ui/Button";
import { useTasks } from "@/lib/hooks/useTasks";
import { useToast } from "@/lib/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast";

/**
 * Component to display and manage a list of tasks with filtering, searching, pagination, and CRUD operations
 */
export const TaskList: React.FC = () => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { toasts, showToast, removeToast } = useToast();
  const {
    tasks,
    loading,
    pagination,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks({ status, search, page, limit: 10 });

  const handleCreateTask = async (data: Partial<Task>) => {
    try {
      await createTask(data);
      showToast("Task created successfully", "success");
      setIsModalOpen(false);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const handleUpdateTask = async (data: Partial<Task>) => {
    if (!editingTask) return;

    try {
      await updateTask(editingTask.id, data);
      showToast("Task updated successfully", "success");
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      showToast("Task deleted successfully", "success");
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await toggleTask(id);
      showToast("Task status updated", "success");
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatus(newStatus);
    setPage(1); // Reset to first page
  }, []);

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1); // Reset to first page
  }, []);

  return (
    <div className="app-container py-2">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your tasks — filter, search, and update quickly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            <span>Create New Task</span>
          </Button>
        </div>
      </div>

      <TaskFilters
        status={status}
        search={search}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks found</p>
          <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
            Create your first task
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-2">
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>

              <span className="text-sm text-gray-700">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <Button
                variant="secondary"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleModalClose}
        />
      </TaskModal>
    </div>
  );
};
