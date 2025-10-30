'use client';
import Link from "next/link";
import { useRouter,useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from './page.module.css';
import { Product } from '@/app/types/product';
import { useCartStore } from "@/app/store/useCartStore";
import { useWishlistStore } from "@/app/store/useWishListStore";

export default function ProductPage({ id, title, price, description, category, image }: Product){
    const router = useRouter();
    const { products, addItem, removeItem  } = useCartStore();
    const { products: wishlistProducts, toggleWishlist } = useWishlistStore();
    const productInCart = products.find((p) => p.id === id);
    const quantity = productInCart?.quantity || 0;
    const isInWishlist = wishlistProducts.some(p => p.id === id);
    const { id: paramId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!paramId) return;
    
        fetch(`https://fakestoreapi.com/products/${paramId}`)
          .then((res) => res.json())
          .then((data: Product) => {
            setProduct(data);
            setLoading(false);
          });
      }, [paramId]);

      if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className={styles.productPage}>
        <button
         onClick={() => router.back()}
          className={styles.link}
        >
          ← Back to {product.category}
        </button>          <img src={product.image} alt={product.title} className={styles.image} />
          <div className={styles.info}>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.desc}>{product.description}</p>
            <p className={styles.price}>price: ${product.price.toFixed(2)}</p>
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
        </div>
      );
}
