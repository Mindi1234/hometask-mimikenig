'use client';
import React, { useEffect, useState } from "react";
import ProductCard from "./components/product/ProductCard";
import { Product } from "@/app/types/product";
import Image from "next/image";
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4') 
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data.reverse()); 
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    
    <div className={styles.homePage}>
      
      <div className={styles.hero}>
        <Image 
          src="/Screenshot 2025-10-29 120859.png" 
          alt="Main Banner"
          width={800}
          height={400}
          className={styles.heroImage}
        />
      </div>
      <h2 className={styles.latestTitle}>Latest Products</h2>

      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard key={product.id} {...product} quantity={0} />
        ))}
      </div>
    </div>
  );
  // return (
  //   <div className={styles.container}>
  //     <div className={styles.hero}>
  //       <Image 
  //         src="/Screenshot 2025-10-29 120859.png" 
  //         alt="Main Banner"
  //         width={800}
  //         height={400}
  //         className={styles.heroImage}
  //       />
  //     </div>
  //     <h2 className={styles.latestTitle}>LATEST PRODUCTS</h2>
  //     <div className={styles.productsGrid}>
  //       {products.map(product => (
  //         <div key={product.id} className={styles.productCard}>
  //           <Image src={product.image} alt={product.title} width={200} height={200} />
  //           <h3>{product.title}</h3>
  //           <p>${product.price}</p>
  //           <button className={styles.addToCart}>ADD TO CART</button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}
