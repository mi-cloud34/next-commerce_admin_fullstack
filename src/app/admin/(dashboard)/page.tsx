"use client";

import BestSellingProducts from "./BestSellingProduct";
import ProductCategoryChart from "./Category";
import DashboardCard from "./DahboardCard";
import UserOrderChart from "./UserOrderChart";

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Genel Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Toplam Kullanıcı" value="1200" />
        <DashboardCard title="Toplam Kategori" value="15" />
        <DashboardCard title="Toplam Ürün" value="350" />
        <DashboardCard title="Toplam Gelir" value="$50,000" />
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserOrderChart />
        <ProductCategoryChart />
      </div>

      {/* En Çok Satılan Ürünler */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">En Çok Satılan Ürünler</h2>
        <BestSellingProducts products={[]} />
      </div>
    </div>
  );
};
export default Dashboard;