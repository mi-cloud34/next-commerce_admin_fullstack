"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Hero from "./(ecommerce)/components/Hero";
import Category from "./(ecommerce)/components/Category";
import Products from "./(ecommerce)/components/Product";

export default function Home() {
  const [showCart, setShowCart] = useState(false);

  // Yüklenme durumları için state
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isProductsVisible, setIsProductsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  // Ref'ler
  const categoryRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const resetVisibility = () => {
    setIsCategoryVisible(false);
    setIsProductsVisible(false);
    setIsFooterVisible(false);
  };

  // Intersection Observer
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === categoryRef.current) {
            setIsCategoryVisible(true);
          } else if (entry.target === productsRef.current) {
            setIsProductsVisible(true);
          } else if (entry.target === footerRef.current && !isProductsLoading) {
            setIsFooterVisible(true);
          }
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1, // Daha hassas bir threshold
    });
  
    if (categoryRef.current) observer.observe(categoryRef.current);
    if (productsRef.current) observer.observe(productsRef.current);
    if (footerRef.current) observer.observe(footerRef.current);
  
    return () => observer.disconnect();
  }, [isProductsLoading]);
  

  return (
    <>
      {/* Navbar Sabit */}
     {/*  <motion.div
        className=" top-0 left-0 w-full z-150 shadow-md"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <NavBar setShowCart={setShowCart} />
      </motion.div> */}

      {/* Ana İçerik */}
      <main className="pt-[80px] pb-[100px] pl-10 pr-10 space-y-10">
        {/* Hero Bölümü */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Hero />
        </motion.div>

        {/* Category Bölümü */}
        <div ref={categoryRef}>
          {isCategoryVisible && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Category />
            </motion.div>
          )}
        </div>

        {/* Products Bölümü */}
        <div ref={productsRef} style={{ minHeight: "500px" }}> {/* Minimum bir yükseklik belirleyin */}
  {isProductsVisible ? (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Products />
    </motion.div>
  ) : (
    <div className="animate-pulse bg-gray-200 h-full"> {/* Placeholder */}
      Loading products...
    </div>
  )}
</div>
      </main>

      {/* Footer */}
    {/* Footer */}
{/* <div ref={footerRef} style={{ minHeight: "200px" }}>
  {isFooterVisible ? (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Footer />
    </motion.div>
  ) : (
    <div className="animate-pulse bg-gray-200 h-full"> 
      Loading footer...
    </div>
  )}
</div> */}
    </>
  );
}
