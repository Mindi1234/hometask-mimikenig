"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import styles from '@/app/components/header/Header.module.css';
import Cart from "../cart/CartItem";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((state) => state.cartCount);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

//   const windowCart = (e) => {
//     e.preventDefault();
//     setIsCartOpen(prev => !prev);
// };
const windowCart = (e: React.MouseEvent<HTMLAnchorElement>) => { 
    e.preventDefault();
    setIsCartOpen(prev => !prev);
};
  return (
   <>
   <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>

   <Link href="/" className={styles.logo}>
        <Image
          src="/logo2.jpg"
          alt="task Logo"
          width={50}
          height={10}
          priority
          style={{ 
            objectFit: 'contain',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/categories/men's clothing" className={styles.link}>Mens</Link>
        <Link href="/categories/women's clothing" className={styles.link}>Womens</Link>
        <Link href="/categories/jewelery" className={styles.link}>Jewelery</Link>
        <Link href="/categories/electronics" className={styles.link}>Electronics</Link>
      </nav>

      <a 
          href="/cart" 
          onClick={windowCart} 
          className={`${styles.link} ${styles.cartLink}`}
        >
          Cart ({cartCount})
        </a>
      
    </header>
    {isCartOpen && <Cart closeCart={() => setIsCartOpen(false)} />}
   </>
  );
}