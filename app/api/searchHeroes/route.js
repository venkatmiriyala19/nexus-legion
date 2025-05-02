// app/api/searchHeroes/route.js
// This is the App Router format for API routes in Next.js 13+

export async function GET(request) {
  // Get the query parameter from the URL
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Search query is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // The correct format for the Superhero API
    const response = await fetch(
      `https://superheroapi.com/api.php/${process.env.NEXT_PUBLIC_SUPERHERO_API_KEY}/search/${query}`
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching superhero data:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch superhero data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
