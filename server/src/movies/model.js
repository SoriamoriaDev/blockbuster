import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    movie_id : Number,
    title : String,
    category_name : String,
    edition : String,
    release_year : Number,
    running_time : Number,
    rating_name : String,
    disc_format_name : String,
    number_discs : Number,
    viewing_format_name : String,
    aspect_ratio_name :  String,
    status : Number
})



// Export the model
export default mongoose.model('Movie', Schema); 