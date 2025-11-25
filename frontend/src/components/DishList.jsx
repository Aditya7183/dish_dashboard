import React, { useEffect, useState } from "react";
import axios from "axios";
import DishCard from "./DishCard";
import AddDish from "./AddDish"; // the AddDish component you added earlier

const API_BASE = "http://localhost:5000/api";

export default function DishList() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [error, setError] = useState("");

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/dishes`);
      setDishes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dishes from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleToggle = async (dishId) => {
    try {
      setTogglingId(dishId);
      const res = await axios.patch(`${API_BASE}/dishes/${dishId}/toggle`);
      const updated = res.data;
      setDishes((prev) => prev.map((d) => (d.dishId === updated.dishId ? updated : d)));
    } catch (err) {
      console.error("Toggle failed", err);
      alert("Failed to toggle status.");
    } finally {
      setTogglingId(null);
    }
  };

  // callback when AddDish creates a new dish => refresh list
  const onDishCreated = () => fetchDishes();

  if (loading) return <div style={{ padding: 20 }}>Loading dishes…</div>;

  return (
    <div style={{ padding: 20, minHeight: "100vh", background: "#050505", color: "#fff" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Dish Dashboard</h1>
        <p style={{ marginTop: 6, opacity: 0.8 }}>Manage dishes — toggle publish or add new ones using images in backend/public/images</p>
      </header>

      <AddDish onCreated={onDishCreated} />

      {error && <div style={{ color: "salmon", marginBottom: 12 }}>{error}</div>}

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14
        }}
      >
        {dishes.map((dish) => (
          <DishCard key={dish.dishId} dish={dish} onToggle={handleToggle} togglingId={togglingId} />
        ))}
      </main>
    </div>
  );
}
