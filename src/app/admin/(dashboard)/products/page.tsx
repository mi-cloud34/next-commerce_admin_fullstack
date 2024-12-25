"use client";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import Image from "next/image";
import Header from "../../(components)/Header";
import Rating from "../../(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import axios from "axios";
import Category from "../category/page";
import { confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


/* type ProductFormData = {
  name: string;
  description:string,
  brand:string,
  price: number;
  categoryId: Category;
  inStock: number;
  rating: number;
}; */
const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [initialData, setInitialData] = useState<ProductType | null>(null); 
const isLoading=false;
const isError=false;
   

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const deleteProduct = async (productId: string) => {
  try {
    // Sending DELETE request to API
    const response = await axios.delete(`/api/delete_product/${productId}`);
    console.log('Deleted Product:', response.data);
    
    // After deletion, you may want to refetch the products or remove it from state
    setProducts(products.filter(product => product._id !== productId));
  } catch (err) {
    setError("Failed to delete product");
  }
};
const deleteRecord = (id: string) => {
  console.log('Delete Record Triggered', id); // Log ekleyin
  confirmAlert({
    title: 'Confirm to Delete',
    message: 'Are you sure you want to delete this category?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          console.log('Confirmed Delete', id); // Log ekleyin
          deleteProduct(id);
        },
      },
      {
        label: 'No',
        onClick: () => console.log('Delete Cancelled'), // Log ekleyin
      },
    ],
  });
};

const fetchProducts = async () => {
  try {
    const response = await axios.get("/api/get_products"); // API endpoint
    setProducts(response.data);
    setLoading(false);
  } catch (err) {
    setError("Ürünler yüklenirken bir hata oluştu.");
    setLoading(false);
  }
};
useEffect(() => {
 

  fetchProducts();
}, []);
const handleProductChange = () => {
  fetchProducts(); // Yeni listeyi çekmek için API çağrısı
};
const handleUpdate = (product: ProductType) => {
  setInitialData(product); // Güncellenecek ürünü ayarla
  setMode("update");
  setIsModalOpen(true);
};

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full max-h-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() =>{ setIsModalOpen(true),setMode("create")}}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="mx-auto  w-[800px] h-[700px] mt-9 ">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product:any) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto my-5"
            >
              <div className="flex flex-col items-center">
                <Image
                 src="/flags/en.jpg"
                  alt={product.name}
                  width="300" height="400"
                  
                   className="mb-3 rounded-2xl w-72 h-72"
                />
                <h3 className="text-2xl text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.description}
                </h3>
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.categoryId._id}
                </h3>
                <p className="text-gray-800 text-2xl">${product.price}</p>
                <div className="text-xl text-gray-600 mt-1">
                  Stock: {product.inStock}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2 text-3lg ">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
              <div className="flex justify-between ">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() =>handleUpdate(product)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Update
          Product
        </button>
        <button
          className="flex items-center bg-red-500 hover:bg-red-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() =>{ 
            deleteRecord(product._id)
            
          }}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />Delete
          Product
        </button>
        </div>
            </div>
            
          ))
        )}
       
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={mode}
        initialData={initialData!}
        onChange={handleProductChange}
      />
    </div>
  );
};

export default Products;
