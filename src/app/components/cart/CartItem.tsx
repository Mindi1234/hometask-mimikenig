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
        const { products, addItem, removeItem  } = useCartStore(); 
        const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
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
                        <p className={styles.itemPrice}>${item.price?.toFixed(2) || item.price}</p>
                        <div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={item.quantity === 0}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          addItem({
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            price: item.price,
                            category: item.category,
                            image: item.image,
                            quantity: 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
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