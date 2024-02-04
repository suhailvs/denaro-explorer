import Image from "next/image";
import styles from "./page.module.css";
import Link  from "next/link";
import ProductCard from "./components/ProductCard";
export default function Home() {
  return (
    <main><h1>Helloworld</h1>
    <Link href="/users">users</Link>
    
    </main>
      
  );
}
