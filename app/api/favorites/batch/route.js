import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/Favorite";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req); // Get the userId from the request

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json(); // { actions: [{ section, item, action }, ...] }
    const { actions } = body;

    if (!Array.isArray(actions) || actions.length === 0) {
      return new Response("Invalid actions", { status: 400 });
    }

    await connectToDatabase();

    const bulkOps = actions
      .filter(
        ({ section, item, action }) =>
          ["icons", "movies", "comics", "quotes"].includes(section) &&
          item &&
          ["add", "remove"].includes(action)
      )
      .map(({ section, item, action }) => {
        const update =
          action === "add"
            ? { $addToSet: { [`favorites.${section}`]: item } }
            : { $pull: { [`favorites.${section}`]: item } };
        return {
          updateOne: {
            filter: { userId },
            update,
            upsert: true,
          },
        };
      });

    if (bulkOps.length === 0) {
      return new Response("No valid actions", { status: 400 });
    }

    await Favorite.bulkWrite(bulkOps);

    const updatedDoc = await Favorite.findOne({ userId });
    return new Response(
      JSON.stringify({ success: true, favorites: updatedDoc.favorites }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Batch favorites error:", err);
    return new Response("Server error", { status: 500 });
  }
}
