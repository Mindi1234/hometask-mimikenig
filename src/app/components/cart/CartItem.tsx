"use client";
import React, { FC } from 'react';
import Link from 'next/link';
import { useCartStore } from "@/app/store/useCartStore"; 
import styles from './CartItem.module.css'; 


interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}


interface CartItemProps {
    item: Product;
}
interface CartProps {
    closeCart: () => void; 
}

const CartItem: FC<CartItemProps> = ({ item }) => ( 
  <div className={styles.item}>
    <img src={item.image} alt={item.title} className={styles.itemImage} />
    <div className={styles.itemDetails}>
      <p className={styles.itemTitle}>{item.title}</p>
      <p className={styles.itemQuantity}>- {item.quantity}+</p> 
    </div>
  </div>
);

export default function Cart({ closeCart }: CartProps) {
const { cartItems } = useCartStore((state) => ({ 
  cartItems: state.products || [], 
}));
const cartCount = cartItems.length;
const totalAmount = cartItems.reduce((sum, item) => {
  const price = item.price || 0;
  const quantity = item.quantity || 0;
  return sum + (price * quantity);
}, 0);

  return (
    <div className={styles.overlay}>
      <div className={styles.miniCart}>
        <h3 className={styles.headerTitle}>Cart ({cartCount})</h3>
        <button className={styles.closeButton} onClick={closeCart}>X</button>
        <div className={styles.itemsContainer}>
          {cartCount === 0 ? (
            <p className={styles.emptyCart}>empty cart...</p>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item as Product} />
            ))
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.totalBox}>
            Total: {totalAmount ? totalAmount.toFixed(2) : '0.00'}$ 
          </div>
          <Link href="/checkout" className={styles.checkoutButton} onClick={closeCart}>
            CHECKOUT
          </Link>
        </div>
        
      </div>
    </div>
  );
}