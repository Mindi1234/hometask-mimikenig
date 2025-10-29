'use client';
import React, { useEffect, useState } from 'react';
import { Product } from '@/app/types/product';
import styles from './page.module.css';
import Link from 'next/link';

export default function CheckoutPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      if (typeof window === "undefined") return;
  
      const data = localStorage.getItem("cart");
      if (data) {
        const parsed = JSON.parse(data);
        const loadedProducts: Product[] = parsed.products || [];
        setProducts(loadedProducts);
  
        const totalPrice = loadedProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotal(totalPrice);
      }
    }, []);
  
    return (
      <div className={styles.checkoutPage}>
       <div className={styles.header}>
        <div className={styles.h1}>Order</div>
        <div className={styles.h2}>Summary</div>
       </div>
        <Link href="/" className={styles.backLink}>← Back to store</Link>
  
        {products.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className={styles.cartList}>
              {products.map(item => (
                <li key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.title} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
  
            <div className={styles.cartFooter}>
              <p className={styles.total}>Total: ${total.toFixed(2)}</p>
              <button className={styles.checkoutBtn}>Confirm Order</button>
            </div>
          </>
        )}
      </div>
    );
  }