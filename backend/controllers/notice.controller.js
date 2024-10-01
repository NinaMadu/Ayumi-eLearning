import Notice from "../models/notice.model.js";

// Create a new notice
export const createNotice = async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body; // Receive image URL from the frontend
  
      // Create a new notice with the title, description, and image URL
      const newNotice = new Notice({
        title,
        description,
        image: imageUrl, // Save the image URL in the database
      });
  
      // Save the notice to the database
      const savedNotice = await newNotice.save();
  
      res.status(201).json({ message: "Notice created successfully!", notice: savedNotice });
    } catch (error) {
      console.error(error);
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

export const getAllNotices = async (req, res) => {
    try {
      // Retrieve all notices from the database
      const notices = await Notice.find();
  
      // Check if any notices exist
      if (!notices.length) {
        return res.status(404).json({ message: "No notices found" });
      }
  
      // Return the notices
      res.status(200).json({ message: "Notices retrieved successfully", notices });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving notices", error });
    }
  };
  

  // Update an existing notice
export const editNotice = async (req, res) => {
    try {
      const { id } = req.params; // Get the notice ID from the request parameters
      const { title, description, imageUrl } = req.body; // Receive updated data from the frontend
  
      // Find the notice by ID and update it
      const updatedNotice = await Notice.findByIdAndUpdate(
        id,
        { title, description, image: imageUrl }, // Update the notice with new data
        { new: true } // Option to return the updated document
      );
  
      // Check if the notice was found and updated
      if (!updatedNotice) {
        return res.status(404).json({ message: "Notice not found" });
      }
  
      res.status(200).json({ message: "Notice updated successfully", notice: updatedNotice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating notice", error });
    }
  };
  

  export const getNoticeById = async (req, res) => {
    const { id } = req.params; // Get the notice ID from the request parameters
  
    try {
      // Retrieve the notice by ID from the database
      const notice = await Notice.findById(id);
  
      // Check if the notice exists
      if (!notice) {
        return res.status(404).json({ message: "Notice not found" });
      }
  
      // Return the notice
      res.status(200).json({ message: "Notice retrieved successfully", notice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving notice", error });
    }
  };