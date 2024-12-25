"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../(components)/Header";
import { DeleteIcon, EditIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Image from "next/image";



const Category = () => {


  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allData, setAllData] = useState<CategoryType[]>([]);
  const [query, setQuery] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/get_category"); // API endpoint
      setCategories(response.data);
      setLoading(false);
      setAllData(response.data);
    } catch (err) {
      setError("Ürünler yüklenirken bir hata oluştu.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const searchData = useCallback(
    (query: string) => {
      let filteredData = allData; // Orijinal tüm veriler
      if (query) {
        filteredData = allData.filter((u) =>
          u.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      setCategories(filteredData); // Filtrelenmiş veya orijinal veriyi güncelle
    },
    [allData] // `allData` değiştiğinde fonksiyon yeniden oluşturulacak
  );

  useEffect(() => {
    searchData(query);
  }, [query, searchData]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  
  const deleteCategory = async (id:string) => {
    try {
      const response = await axios.delete(`/api/delete_category/${id}`); // API endpoint
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      setError("Ürünler yüklenirken bir hata oluştu.");
      setLoading(false);
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
            deleteCategory(id);
          },
        },
        {
          label: 'No',
          onClick: () => console.log('Delete Cancelled'), // Log ekleyin
        },
      ],
    });
  };
  
 /*  if (isError || !products.length) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }  */

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={query}
             onChange={(e)=>setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Category" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Category
        </button>
      </div>
      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
<div className="container mx-auto p-4">
     
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b border-gray-200">ID</th>
              <th className="px-4 py-2 text-left border-b border-gray-200">Name</th>
              <th className="px-4 py-2 text-left border-b border-gray-200">İmage</th>
              <th className="px-4 py-2 text-left border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td
                  className={`px-4 py-2 border-b border-gray-200 ${
                    index % 2 === 1 ? 'bg-blue-100' : 'bg-white'
                  }`}
                >
                  {category._id}
                </td>
                <td
                  className={`px-4 py-2 border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-blue-100'
                  }`}
                >
                  {category.name}
                </td>
                <td>
                  <Image src={category?.imgUrl} alt="" width={50} height={50}/>
                </td>
                <div className='flex justify-center'>
                         <div className='cursor-pointer text-green-700 mr-2' onClick={()=>{}}>
                          <EditIcon/>
                         </div> 
                         <div className='cursor-pointer text-orange-700' onClick={()=>deleteRecord(category._id)}>
                          <DeleteIcon/>
                         </div>
                        </div>
              </tr>
              
            ))}
          
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Category;
