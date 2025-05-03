import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    favorites: {
      icons: [{ type: Object }],
      movies: [{ type: Object }],
      comics: [{ type: Object }],
      quotes: [{ type: Object }],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Favorite ||
  mongoose.model("Favorite", favoriteSchema);
