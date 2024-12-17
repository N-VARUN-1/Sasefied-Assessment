import React, { useEffect, useState } from "react";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("/api/viewtasks");
                const data = await response.json();
                setTasks(data); // Store the tasks in state
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Function to determine badge color
    const getBadgeColor = (category) => {
        switch (category) {
            case "Urgent":
                return "bg-red-100 text-red-800";
            case "To be done":
                return "bg-yellow-100 text-yellow-800";
            case "Not so important":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Task List</h2>
            {tasks.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr
                                    key={task._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 text-gray-900 font-medium">
                                        {task.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${getBadgeColor(
                                                task.category
                                            )}`}
                                        >
                                            {task.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {new Date(task.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {task.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 mt-4">No tasks available.</p>
            )}
        </div>
    );
}
