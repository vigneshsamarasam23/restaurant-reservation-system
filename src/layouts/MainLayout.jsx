import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="bg-transparent">{children}</main>
    </>
  );
}

export default MainLayout;
