import menuData from "../data/menuData";
import MenuCard from "../components/MenuCard";

function Menu() {
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
          {menuData.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
