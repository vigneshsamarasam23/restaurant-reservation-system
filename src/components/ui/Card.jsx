function Card({ children }) {
  return (
    <div className="rounded-[28px] border border-slate-200/60 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_25px_75px_rgba(15,23,42,0.12)]">
      <div className="p-6">{children}</div>
    </div>
  );
}

export default Card;
