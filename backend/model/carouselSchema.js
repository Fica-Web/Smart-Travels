import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
    {
        title: {  
            type: String,
            required: true,
        },
        imageUrl: {  
            type: String,
            required: true,
        },
        imageId: {  
            type: String,
            required: true, 
            unique: true,
        },
    },
    { timestamps: true }
);

const Carousal = mongoose.model("Carousel", carouselSchema);

export default Carousal;