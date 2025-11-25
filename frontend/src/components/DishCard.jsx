/* eslint-disable react/prop-types */
export default function DishCard({ dish, onToggle, togglingId }) {
  const FALLBACK = "/fallback-image.png";

  return (
    <div
      style={{
        background: "#111",
        padding: "1rem",
        borderRadius: 12,
        border: "1px solid #333",
        color: "white",
        width: "25%",
          height: "180px",
          alignItems:"center"
      }}
    >
      {/* FIXED IMAGE STYLING */}
      <img
        src={dish.imageUrl}
        alt={dish.dishName}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = FALLBACK;
        }}
        style={{
          width: "100%",
          height: "180px",        // << FIX
          objectFit: "cover",       // << FIX
          borderRadius: "8px",      // << FIX
          marginBottom: "10px"
        }}
      />

      <h3 style={{ margin: "8px 0" }}>{dish.dishName}</h3>

      <p>
        Status:{" "}
        <span style={{ color: dish.isPublished ? "lightgreen" : "tomato" }}>
          {dish.isPublished ? "Published" : "Unpublished"}
        </span>
      </p>

      <button
        onClick={() => onToggle(dish.dishId)}
        disabled={togglingId === dish.dishId}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          background: dish.isPublished ? "crimson" : "seagreen",
          color: "white",
          fontWeight: "bold"
        }}
      >
        {togglingId === dish.dishId
          ? "Updating..."
          : dish.isPublished
          ? "Unpublish"
          : "Publish"}
      </button>
    </div>
  );
}
