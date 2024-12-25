"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Heading from "./general/Heading";
import { useSearchParams } from "next/navigation";

const Products = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("q");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (categoryId) queryParams.append("categoryId", categoryId);
      if (search) queryParams.append("q", search);
      const url = `/api/get_products?${queryParams.toString()}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      console.error("Ürünler yüklenirken hata oluştu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, search,products]);

  const getAnimationClass = (index: number) => {
    if (index % 3 === 0) return "animate-slideInLeft"; // Sol
    if (index % 3 === 1) return "animate-slideInTop"; // Üst
    return "animate-slideInRight"; // Sağ
  };

  return (
    <div>
      <div className="flex flex-row gap-1">
        <Heading text="Popüler Ürünler" />
        <Heading text="Son Yüklenenler" />
        <Heading text="Tüm Ürünler" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 px-3 md:px-10">
        {products.map((product, index) => (
          <div key={product._id} className={getAnimationClass(index)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
