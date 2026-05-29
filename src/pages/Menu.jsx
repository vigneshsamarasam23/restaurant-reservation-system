import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { fetchMenu } from "../services/api";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const data = await fetchMenu();
        setMenu(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-slate-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 rounded-[36px] border border-slate-200/70 bg-white/90 p-8 shadow-[0_25px_50px_rgba(15,23,42,0.08)]">
          <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Our Menu
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Discover delicious meals crafted with fresh ingredients, vibrant
            flavors, and inviting presentation.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {menu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
