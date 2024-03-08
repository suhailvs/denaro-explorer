import HomeTable from "./components/Home";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="container">
        <HomeTable />
      </div>
    </main>
  );
}
