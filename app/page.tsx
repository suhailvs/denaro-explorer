import Link from "next/link";
import HomeTable from "./components/Home";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";

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
