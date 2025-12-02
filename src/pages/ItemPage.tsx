import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }

        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error loading item: {error.message}</p>;

  if (!item) return <p>Item not found.</p>;

  return (
    <div>
      <h1>{item.id}</h1>
      <h1>{item.name}</h1>
    </div>
  );
};

export default ItemPage;
