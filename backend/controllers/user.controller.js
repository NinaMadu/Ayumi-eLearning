import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import UserProgress from "../models/userProgress.model.js";


// Retrieve all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id); // Find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

export const totalUsers =  async(req,res)=>{
    try{
        const userCount = await User.countDocuments();
        res.status(200).json({userCount});
    }catch(error){
        res.status(500).json({message:"Error fetching user count"});
    }
};

export const deactivateUser = async(req,res)=>{
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.isActive=false;
        await user.save();
        res.status(200).json({message:"User account has been deactivated"});

    }catch(error){
        res.status(500).json({message:"Failed to deactivate user"});
    }
}

export const activateUser = async(req,res)=>{
    const { id } = req.params; // Get the user ID from the request parameters

  try {

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user's isActive status
    user.isActive = true; // Set isActive to true (activate user)

    // Save the updated user
    await user.save();

    // Send response
    return res.status(200).json({ message: 'User activated successfully.', user });
  } catch (error) {
    console.error("Error activating user:", error);
    return res.status(500).json({ message: 'Server error, could not activate user.' });
  }
}

export const getOnlineUsers = async (req, res) => {
    try {
        const onlineUsers = await User.find({ isLoggedIn: true }); // Fetch users with isLoggedIn set to true
        if (onlineUsers.length === 0) {
            return res.status(404).json({ message: "No users are currently online." });
        }
        res.status(200).json({ message: "Online users retrieved successfully", onlineUsers });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving online users", error });
    }
};



export const addFavourite = async(req,res)=>{
    const {userId,courseId} = req.params;
    try{
        const course= await Course.findById(courseId);
        if(!course){
            return res.status(401).json({message:"Course not found"});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        if(!user.favorities.includes(courseId)){
            user.favorities.push(courseId);
            await user.save();

        }

        res.status(200).json(user);

    }
    catch(error){

        res.status(500).json({message:"Failed to add favourite"});
    }
}


export const removeFavourite = async(req,res)=>{
    const {userId,courseId} = req.params;
    try{
        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(401).json({message:"User not found"});
        }

        user.favorities = user.favorities.filter(id=> id.toString() !== courseId);
        await user.save();

        res.status(200).json({message:"Favourite removed successfully"});

    }
    catch(error){

        res.status(500).json({message:"Failed to remove favourite"});

    }
}


export const getUserFavo = async(req,res) =>{
    const {userId} = req.params;
    try{
       const user = await User.findById(userId).populate('favorities');
       if(!user)
       {
           return res.status(401).json({message:"User not found"});
       }

       res.status(200).json({favorities:user.favorities});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Failed to get favourite"});
    }
}


export const enrollCourse = async(req,res)=>{
    const {userId,courseId} = req.params;
    try{
        const course= await Course.findById(courseId);
        if(!course){
            return res.status(401).json({message:"Course not found"});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        if(!user.enrolledCourses.includes(courseId)){
            user.enrolledCourses.push(courseId);
            await user.save();
            course.students.push(userId);
            await course.save();

        }

        res.status(200).json(user);

    }
    catch(error){

        res.status(500).json({message:"Failed to add favourite"});
    }

}

export const removeEnroll = async(req,res)=>{
    const {userId,courseId} = req.params;
    try{
        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(401).json({message:"User not found"});
        }

        user.enrolledCourses = user.enrolledCourses.filter(id=> id.toString() !== courseId);
        await user.save();

        res.status(200).json({message:"unenroll successfully"});

    }
    catch(error){

        res.status(500).json({message:"Failed to unenroll"});

    }
}


export const getUserEnroll = async (req,res)=>{
    const {userId} = req.params;
     try{
       const user = await User.findById(userId).populate('enrolledCourses');
       if(!user)
       {
           return res.status(401).json({message:"User not found"});
       }
       //console.log("Enrolled courses:", user.enrolledCourses);
       res.status(200).json({enrolledCourses: user.enrolledCourses});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Error fetching enrolled courses"});
    }
}


export const calculateCourseProgress = async (req,res)=>{

    const {userId,courseId} = req.params;
    try{

        const course = await Course.findById(courseId);
        if(!course) 
        {
            return res.status(401).json({message:"Course not found"});
        }

        //calculate total duration
        const totalDuration = course.playlist.reduce((sum,video)=> sum+video.videoDuration,0);


        //userProgress
        const userProgress = await UserProgress.findOne({userId,courseId});
        if(!userProgress)//no progress yet
        {
            return res.status(200).json({message:"No progress found"});
        }


        //calculate watched duration
        const watchedDuration = userProgress.watchedVideos.reduce((sum, video)=>sum+video.watchedTime,0);

        //calculate progress percentage
        const progress = (watchedDuration/totalDuration)*100;

        res.status(200).json({progress});


    }
    catch(error){
        // console.error("Error calculating progress: ",error.message);
        res.status(500).json({message:"Failed to calculate progress"});

    }
}


export const getUserProgress = async (req,res)=>{
    // serProgress/:userId/:courseId/:videoId
    const {userId,courseId,videoId} = req.params;
    try{
        const userProgress = await UserProgress.findOne({
            userId,
            courseId
        });

        if(!userProgress){
            return res.status(401).json({
                message:"No progress found",
                watchedTime:0,
            });
        };

        const videoProgress = userProgress.watchedVideos.find(video=>video.videoId === videoId);
        if(!videoProgress){
            return res.status(401).json({
                message:"No progress found",
                watchedTime:0,
            });
        };

        return res.status(200).json({  
            message:"Progress fetched successfully",
            watchedTime:videoProgress.watchedTime
         })


    }
    catch(error){
        console.error("Error fetching progress: ",error.message);
        res.status(500).json({message:"Failed to fetch progress"});

    }


};
    


export const updateUserProgress = async (req,res)=>{

    const {videoId, userId, courseId, watchedTime} = req.body;

    try{
        let userProgress = await UserProgress.findOne({
            userId, 
            courseId
        });

        if(!userProgress){
            userProgress = new UserProgress({
                userId,
                courseId,
                watchedVideos:[{
                    videoId,
                    watchedTime,
                }]
            });
        }
        else{
            const videoIndex = userProgress.watchedVideos.findIndex((v)=>v.videoId===videoId);
            if(videoIndex > -1)
            {
                if(watchedTime> userProgress.watchedVideos[videoIndex].watchedTime)
                {
                    userProgress.watchedVideos[videoIndex].watchedTime = watchedTime;

                }
                else{
                    userProgress.watchedVideos.push({
                        videoId,
                        watchedTime
                    });
                }

            }

            
        
        
        }
        await userProgress.save();
            res.status(200).json({
                message:"Progress updated successfully"
            });

    }
    catch(error){
        console.error("Error updating progress: ",error.message);
        res.status(500).json({message:"Failed to update progress"});

    }

   

}