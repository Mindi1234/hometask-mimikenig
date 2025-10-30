'use client'; 
import Link from 'next/link';
import { Product } from '@/app/types/product';
import styles from './page.module.css';
import { useWishlistStore } from '../store/useWishListStore';

export default function WishListPage() {
    const { products, toggleWishlist  } = useWishlistStore(); 

    return (
        <div className={styles.wishlistPage}>
          {products.length === 0 ? (
            <p>your wishList is empty!</p>
          ) : (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <img src={product.image} alt={product.title} className={styles.productCard} />
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productPrice}>${product.price}</p>
    
                  <div className={styles.actions}>
                    <Link href={`/product/${product.id}`} className={styles.detailsBtn}>
                     view details
                    </Link>
                    <button
                      className={styles.removeBtn}
                      onClick={() => toggleWishlist(product)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );

}
