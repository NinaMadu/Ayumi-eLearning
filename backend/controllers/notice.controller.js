import Notice from "../models/notice.model.js";

// Create a new notice
export const createNotice = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const newNotice = new Notice({ title, description, image });
        const savedNotice = await newNotice.save();
        res.status(201).json(savedNotice);
    } catch (error) {
        res.status(500).json({ message: "Error creating notice", error });
    }
};

export const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotice = await Notice.findByIdAndDelete(id);
        if (!deletedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notice", error });
    }
};


// Edit an existing notice by ID
export const editNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedNotice = await Notice.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json(updatedNotice);
    } catch (error) {
        res.status(500).json({ message: "Error updating notice", error });
    }
};