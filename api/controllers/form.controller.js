import formModel from "../models/form.model.js";

export const addTask = async (req, res) => {
  const { title, category, description, date } = req.body;

  if (!title || !category || !description || !date) {
    return res.status(400).json({ message: "Please fill the required fields" });
  }

  const newTask = new formModel({ title, category, description, date });

  try {
    await newTask.save();
    console.log("New Task added");
    res.status(201).json({ message: "New Task added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await formModel.find(); // Fetch all tasks
    res.status(200).json(tasks); // Send tasks to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};
