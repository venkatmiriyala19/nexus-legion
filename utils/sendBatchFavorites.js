// utils/sendBatchFavorites.js
export function setupBatchFavorites() {
  const sendBatch = async () => {
    const queuedActions = JSON.parse(
      localStorage.getItem("favoriteActions") || "[]"
    );

    if (queuedActions.length === 0) return;

    try {
      const response = await fetch("/api/favorites/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actions: queuedActions }),
      });

      if (response.ok) {
        // Clear the queue on success
        localStorage.removeItem("favoriteActions");
      } else {
        console.error("Failed to send batch favorites", response.status);
        // Optionally, keep the queue for retry later
      }
    } catch (err) {
      console.error("Error sending batch favorites", err);
      // Keep the queue for retry later
    }
  };

  // Use beacon API for reliable sending during unload
  window.addEventListener("beforeunload", () => {
    const queuedActions = JSON.parse(
      localStorage.getItem("favoriteActions") || "[]"
    );
    if (queuedActions.length > 0) {
      navigator.sendBeacon(
        "/api/favorites/batch",
        JSON.stringify({ actions: queuedActions })
      );
      // Clear the queue optimistically
      localStorage.removeItem("favoriteActions");
    }
  });
}
