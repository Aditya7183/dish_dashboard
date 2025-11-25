import { useEffect, useState } from "react";
import { getImages, createDish } from "../services/api";

export default function AddDish({ onCreated }) {
  const [images, setImages] = useState([]);
  const [dishName, setDishName] = useState("");
  const [dishId, setDishId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    getImages().then((imgs) => {
      setImages(imgs);
      if (imgs.length > 0) setSelectedImage(imgs[0].filename);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createDish({
      dishId: Number(dishId),
      dishName,
      imageFileName: selectedImage,
      isPublished
    });

    alert("Dish added!");
    onCreated();
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Add Dish</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 10, maxWidth: 300 }}
      >
        <input
          placeholder="Dish ID"
          value={dishId}
          onChange={(e) => setDishId(e.target.value)}
        />

        <input
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
        />

        <select
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
        >
          {images.map((img) => (
            <option key={img.filename} value={img.filename}>
              {img.filename}
            </option>
          ))}
        </select>

        {selectedImage && (
          <img
            src={images.find((i) => i.filename === selectedImage)?.url}
            alt="preview"
            style={{
              width: 150,
              height: 100,
              objectFit: "cover",
              borderRadius: 6
            }}
          />
        )}

        <label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />{" "}
          Published
        </label>

        <button>Add Dish</button>
      </form>
    </div>
  );
}
