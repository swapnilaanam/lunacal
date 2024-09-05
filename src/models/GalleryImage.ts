import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    }
});

export default mongoose.models.GalleryImage || mongoose.model("GalleryImage", galleryImageSchema);