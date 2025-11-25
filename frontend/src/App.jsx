import { useEffect, useState } from "react";
import { getDishes, toggleDishPublish } from "./services/api";
import DishCard from "./components/DishCard";
import AddDish from "./components/AddDish";

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const data = await getDishes();
    setDishes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (id) => {
    setTogglingId(id);
    await toggleDishPublish(id);
    fetchData();
    setTogglingId(null);
  };

  if (loading) return <h2 style={{ padding: 20 }}>Loading...</h2>;

  return (
    <div style={{ padding: 20, background: "#000", minHeight: "100vh", color: "white" }}>
      <h1>Dish Dashboard</h1>

      <AddDish onCreated={fetchData} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20
      }}>
        {dishes.map((d) => (
          <DishCard
            key={d.dishId}
            dish={d}
            togglingId={togglingId}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
