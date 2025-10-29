import React from "react";
import Link from "next/link";
import styles from '@/app/components/product/ProductCard.module.css';
import { useCartStore } from "@/app/store/useCartStore";
import { Product } from '@/app/types/product';


// interface CardProps {
//     id: number;
//     title: string;
//     price: number;
//     description: string;
//     category: string;
//     image: string;
//     quantity: number;
// }

export default function ProductCard({ id, title, price, description, category, image }: Product) {
    const { products, addItem, removeItem  } = useCartStore();
    
    const productInCart = products.find((p) => p.id === id);
    const quantity = productInCart?.quantity || 0;
    return(
    
        <div className={styles.card}>
        <Link href={`/product/${id}`} className={styles.card}>
        <div className={styles.cardImage}>
            <img src={image} alt={title} />
        </div>

        <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
            <p className={styles.cardPrice}>${price.toFixed(2)}</p>
        </div>
        </Link>
        <div className={styles.quantityControls}>
                <button 
                     className={styles.addButton} 
                    onClick={() => removeItem(id)}
                    disabled={quantity === 0} 
                >
                    −
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button 
                    className={styles.addButton} 
                    onClick={() => addItem({ id, title, description, price, category, image, quantity: 1 })}
                >
                    +
                </button>
            </div>

    </div>
    
    );
}
