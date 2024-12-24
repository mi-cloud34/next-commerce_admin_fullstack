"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AccountPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street, Springfield',
   
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product A',
      price: '$25.00',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Product B',
      price: '$40.00',
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handlePhotoUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo({ ...userInfo,  });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar for User Info */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src="/profil.png"
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handlePhotoUpload}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
            <p className="text-sm text-gray-500">{userInfo.email}</p>
            <button
              onClick={() => logout()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
            >
              Log Out
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Main Content for Purchased Products */}
        <div className="md:col-span-3 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Purchased Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-md border mb-3"
                />
                <h4 className="text-lg font-medium text-center text-gray-700">{product.name}</h4>
                <p className="text-md text-gray-500">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
