import axios from "axios";

export const getUser = async () => {
  try {
   /*  const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token bulunamadı!");
    } */

    const response = await axios.get(`${process.env.BASE_URL}/api/users/me`, {
     /*  headers: {
        Authorization: `Bearer ${token}`, // Token'i Authorization header olarak ekle
      }, */
      withCredentials: true, // Eğer cookie ile çalışıyorsanız
    });

    console.log("Kullanıcı Verisi:", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Kullanıcı alınırken hata oluştu:", error.response || error);
    throw error;
  }
};
