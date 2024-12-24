import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../../(components)/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

type CategoryFormData = {
  name: string;
  imgUrl: string;
};

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
 
};

const CreateProductModal = ({
  isOpen,
  onClose,
  
}: CreateCategoryModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<CategoryFormData>();
      const [selectedFile, setSelectedFile] = useState<File | null>(null);
      const onSubmit = async (data: CategoryFormData) => {
        try {
          const formData = new FormData();

          // Append form fields
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value.toString());
          });
    
          // Append selected file if exists
          if (selectedFile) {
            formData.append("file", selectedFile);
          }
          // POST isteği ile ürünü oluştur
          const response = await axios.post("/api/add_category",formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("Ürün başarıyla oluşturuldu:", response.data);
         toast.success("Created Succesfull Category");
         
        } catch (error:any) {
            const errorMessage =
   /*  error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    error.message || */
          console.error("Ürün oluşturulurken hata:", error);
          //toast.error(JSON.stringify(error.response?.data) );
        }
      };
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setSelectedFile(event.target.files[0]);
        }
      };
    
    
  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form  onSubmit={handleSubmit(onSubmit)} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Category  Name
          </label>
          <input
            type="text"
          
            placeholder="Name"

            className={inputCssStyles}
            {...register("name", { required: "Category ismi gereklidir." })}
          />
          <label>
            Image:
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            />
          </label>
          {/* CREATE ACTIONS */}
          <button
         
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
