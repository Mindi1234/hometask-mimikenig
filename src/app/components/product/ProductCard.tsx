import React from "react";
import Link from "next/link";
import styles from '@/app/components/product/ProductCard.module.css';
import { useCartStore } from "@/app/store/useCartStore";
import { useWishlistStore } from "@/app/store/useWishListStore";
import { Product } from '@/app/types/product';

export default function ProductCard({ id, title, price, description, category, image }: Product) {
    const { products, addItem, removeItem  } = useCartStore();
    const { products: wishlistProducts, toggleWishlist } = useWishlistStore();
    const productInCart = products.find((p) => p.id === id);
    const quantity = productInCart?.quantity || 0;

    const isInWishlist = wishlistProducts.some(p => p.id === id);

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
            <button 
                    className={styles.heartButton} 
                    onClick={() => toggleWishlist({id, title, description, price, category, image, quantity})}
                >
                    {isInWishlist ? '❤️' : '🤍'}
                </button>
    </div>
    
    );
}
