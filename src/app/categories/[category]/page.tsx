"use client";
import ProductCard from '@/app/components/product/ProductCard';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './page.module.css';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

export default function ProductsPerCategory(){
    const params = useParams();
    const category = Array.isArray(params.category) ? params.category[0] : params.category;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;

        setLoading(true);
        fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            });
    }, [category]);

    if (!category) return <p>No category selected</p>;
    if (loading) return <p>Loading...</p>;
    
    return (
        <div className={styles.grid}>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
   

  



}