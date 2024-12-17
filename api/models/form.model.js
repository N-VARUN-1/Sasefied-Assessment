import mongoose from "mongoose";
const { Schema } = mongoose;

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date, // This will store the date
      required: true, // Make it required if you want to enforce that a date must be provided
    },
  },
  {
    timestamps: true, // Optional: Automatically manage createdAt and updatedAt fields
  }
);

const formModel = mongoose.model("formModel", formSchema);

export default formModel;
