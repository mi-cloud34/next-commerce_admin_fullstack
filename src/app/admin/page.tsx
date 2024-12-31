"use client"
import { useRouter } from "next/navigation";
import Dashboard from "./(dashboard)/DashBoard";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = "YOUR_JWT_TOKEN";

        const response = await fetch("/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthorized(true); // Eğer yetkilendirme başarılıysa
        } else {
          router.push("/"); // Yetkilendirme başarısızsa ana sayfaya yönlendir
        }
      } catch (error) {
        console.error("Yetkilendirme hatası:", error);
        router.push("/"); // Hata durumunda da ana sayfaya yönlendir
      }
    };

    fetchAdminData();
  }, [router]);
  return <Dashboard/>
}
