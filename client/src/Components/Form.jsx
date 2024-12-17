import React, { useState } from "react";
import { Datepicker } from "flowbite-react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Form() {
    const navigate = useNavigate();
    const [taskTitle, setTaskTitle] = useState("");
    const [dateTime, setDateTime] = useState(null);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: "", type: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "taskTitle":
                setTaskTitle(value);
                break;
            case "category":
                setCategory(value);
                break;
            case "description":
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const handleDateChange = (date) => {
        setDateTime(date);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            title: taskTitle,      // Rename to match backend field
            date: dateTime,        // Rename to match backend field
            category,
            description,
        };

        if (!formData.title || !formData.category || !formData.date || !formData.description) {
            setAlert({ message: "Please fill all the fields", type: "failure" });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setAlert({ message: data.message || "Failed to add task", type: "failure" });
                setLoading(false);
                return;
            }

            setLoading(false);
            setAlert({ message: "Task Added Successfully", type: "success" });
            console.log("Task Added!", data);

            // Clear form fields
            setTaskTitle("");
            setDateTime(null);
            setCategory("");
            setDescription("");
        } catch (error) {
            console.error(error);
            setLoading(false);
            setAlert({ message: "An error occurred. Please try again.", type: "failure" });
        }
    };


    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h1 className="flex items-center justify-center mb-12 text-2xl font-bold text-gray-900 dark:text-white">Sasefied Assessment</h1>
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Add a new task
                    </h2>
                    <div className="mb-3">
                        {alert.message && (
                            <Alert
                                color={alert.type}
                                icon={HiInformationCircle}
                                onDismiss={() => setAlert({ message: "", type: "" })}
                            >
                                <span className="font-medium">{alert.message}</span>
                            </Alert>
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="taskTitle"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Task Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="taskTitle"
                                    id="taskTitle"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type task title"
                                    value={taskTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="dateTime"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Date and Time <span className="text-red-500">*</span>
                                </label>
                                <Datepicker selected={dateTime} onChange={handleDateChange} required />
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="To be done">To be done</option>
                                    <option value="Not so important">Not so important</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="8"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                    value={description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-5 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-2"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Task"}
                        </button>
                    </form>
                    <button
                        onClick={() => navigate('/viewTasks')}
                        type="button"
                        className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-500 to-green-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                        disabled={loading}
                    >
                        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {loading ? "loading.." : "View Tasks"}
                        </span>
                    </button>
                </div>
            </section>
        </>
    );
}
