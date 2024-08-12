
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({

    video:{
        type:[String],
        required:true,

    },

    

},{timestamps:true});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
  
    
  