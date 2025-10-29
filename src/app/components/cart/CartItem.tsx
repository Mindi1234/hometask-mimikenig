"use client";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/useCartStore"; 
import { Product } from '@/app/types/product';
import styles from './CartItem.module.css'; 


interface CartProps {
    closeCart: () => void; 
}



export default function Cart({ closeCart }: CartProps) {

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

    return(
        <div className={styles.cartOverlay}>
        <div className={styles.cartContainer}>
          <div className={styles.cartHeader}>
            <h3>cart</h3>
            <button className={styles.closeBtn} onClick={closeCart}>×</button>
          </div>
  
          {products.length === 0 ? (
            <p className={styles.empty}>your cart is empty</p>
          ) : (
            <>
              <ul className={styles.cartList}>
                {products.map((item) => (
                  <li key={item.id} className={styles.cartItem}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemTitle}>{item.title}</p>
                      <p className={styles.itemPrice}>
                        {item.quantity} × ${item.price?.toFixed(2) || item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
  
              <div className={styles.cartFooter}>
                <p className={styles.total}>total: ${total.toFixed(2)}</p>
                <Link href="/checkOut">
                <button className={styles.checkoutBtn}>Check Out</button>
                </Link>

              </div>
            </>
          )}
        </div>
      </div>
    );

}