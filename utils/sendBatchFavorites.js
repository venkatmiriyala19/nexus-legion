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
        // Trigger a re-fetch of favorites (handled by FavoritesContext)
        // You could dispatch an event or use a refetch function if needed
      } else {
        console.error("Failed to send batch favorites", response.status);
      }
    } catch (err) {
      console.error("Error sending batch favorites", err);
    }
  };

  // Periodic batch sending (e.g., every 30 seconds)
  const interval = setInterval(sendBatch, 30000);

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
      localStorage.removeItem("favoriteActions");
    }
  });

  // Cleanup interval on unmount
  return () => clearInterval(interval);
}
