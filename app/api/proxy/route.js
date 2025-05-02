import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let targetUrl = searchParams.get("url");
    const filter = searchParams.get("filter");

    if (!targetUrl) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Append filter parameter if provided
    if (filter) {
      targetUrl += `&filter=${filter}`;
    }

    // Make sure format=json is in the URL
    if (!targetUrl.includes("format=json")) {
      targetUrl += targetUrl.includes("?") ? "&format=json" : "?format=json";
    }

    console.log(
      `Proxy requesting: ${targetUrl.replace(
        /api_key=([^&]+)/,
        "api_key=HIDDEN"
      )}`
    );

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "NexusLegion/1.0",
        Accept: "application/json", // Explicitly request JSON
      },
    });

    // Handle non-200 responses
    if (!response.ok) {
      let errorDetails;
      try {
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          errorDetails = await response.json();
        } else if (
          contentType.includes("text/xml") ||
          contentType.includes("application/xml")
        ) {
          // Parse XML to extract error message
          const textContent = await response.text();
          // Simple regex to extract error message from XML
          const errorMatch = textContent.match(
            /<error><!\[CDATA\[(.*?)\]\]><\/error>/
          );
          errorDetails = {
            error: errorMatch ? errorMatch[1] : "Unknown XML error",
            details: textContent.slice(0, 200),
          };
        } else {
          errorDetails = { error: await response.text() };
        }
      } catch (parseError) {
        errorDetails = {
          error: "Failed to parse error response",
          details: parseError.message,
        };
      }

      return NextResponse.json(
        {
          error: `Target server responded with status: ${response.status}`,
          details: errorDetails,
        },
        { status: response.status }
      );
    }

    // Try to parse as JSON regardless of content type
    try {
      const contentType = response.headers.get("content-type") || "";
      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else if (
        contentType.includes("text/xml") ||
        contentType.includes("application/xml")
      ) {
        // Handle XML response - this is a simplified approach
        const xmlText = await response.text();

        // Extract results from XML and convert to a JSON-like structure
        // This is a very simple XML parser - for production, use a proper XML parser
        const resultsMatch = xmlText.match(/<results>(.*?)<\/results>/s);
        const statusMatch = xmlText.match(
          /<error><!\[CDATA\[(.*?)\]\]><\/error>/
        );

        data = {
          error: statusMatch ? statusMatch[1] : "Unknown status",
          results: resultsMatch ? [] : [], // You would need proper XML parsing for this
        };

        // Indicate this was converted from XML
        data._converted_from_xml = true;
      } else {
        // Attempt to parse as JSON anyway
        data = await response.json();
      }

      return NextResponse.json(data);
    } catch (parseError) {
      // If JSON parsing fails, try to get the raw text and return an error
      const rawText = await response.text();

      return NextResponse.json(
        {
          error: "Failed to parse response as JSON",
          details: parseError.message,
          rawResponse: rawText.slice(0, 1000), // Include the first 1000 chars for debugging
          contentType: response.headers.get("content-type") || "unknown",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Proxy error:", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch data from target URL",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
