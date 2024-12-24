import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

/* type ProductFormData = {
  name: string;
  description: string;
  brand: string;
  price: number;
  categoryId: string;
  inStock: number;
  rating: number;
};

type Category = {
  _id: string;
  name: string;
};
 */
type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  initialData: ProductType;
  onChange: () => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onChange,
}: CreateProductModalProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductType>();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/get_category");
        setCategories(response.data);
      } catch (err) {
        toast.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Handle form reset for create/update modes
  useEffect(() => {
    if (mode === "update" && initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof ProductType, value);
      });
    } else {
      reset();
    }
  }, [mode, initialData, setValue, reset]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  // Form submission
  const onSubmit = async (data: ProductType) => {
    try {
      const formData = new FormData();

      // Append form fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // Append files
      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file) => {
          formData.append("file", file);
        });
      }

      if (mode === "create") {
        await axios.post("/api/add_products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully.");
      } else if (mode === "update") {
        await axios.put("/api/update_product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully.");
      }

      onClose();
      onChange();
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-lg font-bold">
          {mode === "create" ? "Create New Product" : "Update Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <input
            type="text"
            placeholder="Name"
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            {...register("name", { required: "Name is required" })}
          />
          <input
            type="text"
            placeholder="Description"
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            {...register("description", { required: "Description is required" })}
          />
          <select
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            {...register("categoryId", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Brand"
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            {...register("brand", { required: "Brand is required" })}
          />
          <input
            type="number"
            placeholder="Price"
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            {...register("price", { required: "Price is required" })}
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            {...register("inStock", { required: "Stock is required" })}
          />
          <input
            type="number"
            placeholder="Rating"
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
            {...register("rating", { required: "Rating is required" })}
          />
          <label>
            Images:
            <input type="file" multiple onChange={handleFileChange} />
          </label>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {mode === "create" ? "Create Product" : "Update Product"}
          </button>
          <button
            type="button"
            onClick={onClose}
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
