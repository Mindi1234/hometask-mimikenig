"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import styles from '@/app/components/header/Header.module.css';
import Cart from "../cart/CartItem";

export default function Header() {
  const [clientCartCount, setClientCartCount] = useState(0);
  const storeCartCount = useCartStore((state) => state.cartCount);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);


useEffect(() => {
       setClientCartCount(storeCartCount);
      }, [storeCartCount]); 

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
        <Link href="/categories/men" className={styles.link}>Men's clothing</Link>
        <Link href="/categories/women" className={styles.link}>Women's clothing</Link>
        <Link href="/categories/jewelery" className={styles.link}>Jewelery</Link>
        <Link href="/categories/electronics" className={styles.link}>Electronics</Link>
      </nav>
      <Link href="/wishList" className={styles.link}>wishList</Link>
      <Link 
       href="/cart" 
       onClick={windowCart} 
       className={`${styles.link} ${styles.cartLink}`}
      >
      🛒 Cart ({clientCartCount})
       </Link>

  </header>
  {isCartOpen && <Cart closeCart={() => setIsCartOpen(false)} />}
   </>
  );
}