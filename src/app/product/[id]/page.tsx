'use client';
import Link from "next/link";
import { useRouter,useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from './page.module.css';
import { Product } from '@/app/types/product';
import { useCartStore } from "@/app/store/useCartStore";
import { useWishlistStore } from "@/app/store/useWishListStore";

export default function ProductPage(){
    const router = useRouter();
    const { id: paramId } = useParams();
    const { products, addItem, removeItem } = useCartStore();
    const { products: wishlistProducts, toggleWishlist } = useWishlistStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const productInCart = product ? products.find((p) => p.id === product.id) : null;
    const quantity = productInCart?.quantity || 0;
    const isInWishlist = product ? wishlistProducts.some(p => p.id === product.id) : false;

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
                    onClick={() => removeItem(product.id)}
                    disabled={quantity === 0} 
                >
                    −
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button 
                    className={styles.addButton} 
                    onClick={() => addItem({ 
                      id: product.id, 
                      title: product.title, 
                      description: product.description, 
                      price: product.price, 
                      category: product.category, 
                      image: product.image, 
                      quantity: 1 
                    })}
                    
                >
                    +
                </button>
            </div>
            <button 
                    className={styles.heartButton} 
                    onClick={() => toggleWishlist({
                      id: product.id,
                      title: product.title,
                      description: product.description,
                      price: product.price,
                      category: product.category,
                      image: product.image,
                      quantity
                    })}
                    
                >
                    {isInWishlist ? '❤️' : '🤍'}
                </button>
          </div>
        </div>
      );
}
