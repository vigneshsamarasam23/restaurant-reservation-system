import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-8 lg:px-12">
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-[36px] border border-slate-200/70 bg-white/90 p-12 shadow-[0_30px_80px_rgba(15,23,42,0.08)] text-center">
        <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
          Dining made simple
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          Welcome to RestaurantHub
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Reserve tables, browse menus, and order your favorite meals online
          with a polished experience designed for every appetite.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-500"
          >
            View Menu
          </Link>

          <Link
            to="/reservations"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Reserve Table
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
