"use client";
import ProductCard from '@/app/components/product/ProductCard';
import { Product } from '@/app/types/product';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './page.module.css';
export default function ProductsPerCategory() {
    const params = useParams();
    const category = Array.isArray(params.category) ? params.category[0] : params.category;
    const categoryMap: Record<string, string> = {
        men: "men's clothing",
        women: "women's clothing",
        jewelery: "jewelery",
        electronics: "electronics",
    };

    const apiCategory = category ? categoryMap[category] : '/';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;

        setLoading(true);
        fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(apiCategory)}`)
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            });
    }, [category]);

    if (!category) return <p>No category selected</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <h1 className={styles.title}>{category}</h1>
            <div className={styles.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </>
    );






}