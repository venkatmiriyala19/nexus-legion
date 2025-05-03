import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/Favorite";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req); // Get the userId from the request

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json(); // { section, item, action }
    const { section, item, action } = body;

    if (!["icons", "movies", "comics", "quotes"].includes(section)) {
      return new Response("Invalid section", { status: 400 });
    }

    await connectToDatabase();

    const query = { userId };
    const update =
      action === "add"
        ? { $addToSet: { [`favorites.${section}`]: item } }
        : { $pull: { [`favorites.${section}`]: item } };

    const result = await Favorite.findOneAndUpdate(query, update, {
      upsert: true,
      new: true,
    });

    return new Response(
      JSON.stringify({ success: true, favorites: result.favorites }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Favorites error:", err);
    return new Response("Server error", { status: 500 });
  }
}
