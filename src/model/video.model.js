import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BodolandUsers",
      required: true,
    },
    videoId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: "Bagurumba Performance",
    },
    category: {
      type: String,
      enum: ["assam", "india", "global"],
      required: true,
    },
    status: {
      type: String,
      enum: ["processing", "ready", "error"],
      default: "processing",
    },
    votes: {
      type: Number,
      default: 0,
    },
    thumbnailUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
