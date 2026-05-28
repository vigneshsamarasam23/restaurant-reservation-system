import { useCart } from "../context/CartContext";
import Card from "./ui/Card";
import Button from "./ui/Button";
function MenuCard({ item }) {
  const { addToCart } = useCart();

  return (
    <Card>
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
          alt={item.name}
          className="h-56 w-full object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-4 py-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            Chef's choice
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <h3 className="text-xl font-semibold leading-tight text-slate-900">
            {item.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
            ${item.price.toFixed(2)}
          </span>

          <Button onClick={() => addToCart(item)} className="w-full sm:w-auto">
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default MenuCard;
