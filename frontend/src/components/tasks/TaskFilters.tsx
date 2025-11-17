"use client";

import React from "react";

interface TaskFiltersProps {
  status: string;
  search: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (search: string) => void;
}

/**
 * Component for filtering and searching tasks
 * @param status Current status filter
 * @param search Current search query
 * @param onStatusChange Function to handle status filter change
 * @param onSearchChange Function to handle search query change
 */
export const TaskFilters: React.FC<TaskFiltersProps> = ({
  status,
  search,
  onStatusChange,
  onSearchChange,
}) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by title
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <option value="">All tasks</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};
