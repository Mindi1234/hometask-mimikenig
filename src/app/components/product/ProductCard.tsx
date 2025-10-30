import React from "react";
import Link from "next/link";
import styles from '@/app/components/product/ProductCard.module.css';
import { useCartStore } from "@/app/store/useCartStore";
import { useWishlistStore } from "@/app/store/useWishListStore";
import { Product } from '@/app/types/product';

export default function ProductCard(product: Product) {
    const { products, addItem, removeItem  } = useCartStore();
    const { products: wishlistProducts, toggleWishlist } = useWishlistStore();
    const productInCart = products.find((p) => p.id === product.id);
    const quantity = productInCart?.quantity || 0;

    const isInWishlist = wishlistProducts.some(p => p.id === product.id);

    return(
    
        <div className={styles.card}>
        <Link href={`/product/${product.id}`} className={styles.card}>
        <div className={styles.cardImage}>
            <img src={product.image} alt={product.title} />
        </div>

        <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{product.title}</h3>
            <h3 className={styles.cardDescription}>{product.category}</h3>

            <p className={styles.cardPrice}>${product.price.toFixed(2)}</p>
        </div>
        </Link>
        <div className={styles.quantityControls}>
                <button 
                     className={styles.addButton} 
                    onClick={() => removeItem(product.id)}
                    disabled={quantity === 0} 
                >
                    −
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button 
                    className={styles.addButton} 
                    onClick={() => addItem(product)}
                >
                    +
                </button>
            </div>
            <button 
                    className={styles.heartButton} 
                    onClick={() => toggleWishlist(product)}
                >
                    {isInWishlist ? '❤️' : '🤍'}
                </button>
    </div>
    
    );
}
